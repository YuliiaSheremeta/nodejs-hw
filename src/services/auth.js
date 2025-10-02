import { User } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import createHttpError from 'http-errors';
import { FIFTEEN_MINUTES, ONE_DAY, SMTP } from '../constants/index.js';
import { Session } from '../db/models/session.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { sendEmail } from '../utils/sendEmail.js';
import jwt from 'jsonwebtoken';
import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMPLATES_DIR } from '../constants/index.js';

export const registerUser = async (payload) => {
    const user = await User.findOne({ email: payload.email });

  if (user) {
    throw createHttpError(409, 'Email in use');
  }

    const encryptedPassword = await bcrypt.hash(payload.password, 10);

    return await User.create({
        ...payload,
        password: encryptedPassword,
    });
};

export const loginUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });

    if (!user) {
        throw createHttpError(401, 'User not found');
    }

    const isEqual = await bcrypt.compare(payload.password, user.password);

    if (!isEqual) {
        throw createHttpError(401, 'Unauthorized');
    }

    await Session.deleteOne({ userId: user._id });

    const accessToken = crypto.randomBytes(30).toString('base64');
    const refreshToken = crypto.randomBytes(30).toString('base64');

    return await Session.create({
      userId: user._id,
      accessToken,
      refreshToken,
      accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
      refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
    });

};


export const logoutUser = async (sessionId) => {
    await Session.deleteOne({ _id: sessionId });
};
const createSession = () => {
    const accessToken = crypto.randomBytes(30).toString('base64');
    const refreshToken = crypto.randomBytes(30).toString('base64');

    return {
      accessToken,
      refreshToken,
      accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
      refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
    };
};


export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
    const session = await Session.findOne({
      _id: sessionId,
      refreshToken,
    });

    if (!session) {
      throw createHttpError(401, 'Session not found');
    }

    const isSessionTokenExpired =
      new Date() > new Date(session.refreshTokenValidUntil);

    if (isSessionTokenExpired) {
      throw createHttpError(401, 'Session token expired');
    }

    const newSession = createSession();

    await Session.deleteOne({ _id: sessionId, refreshToken });

    return await Session.create({
      userId: session.userId,
      ...newSession,
    });
  };

export const sendResetToken = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found!');
  }
  const resetToken = jwt.sign({
    sub: user._id,
    email,
  },
    getEnvVar('JWT_SECRET'),
    {
    expiresIn:'15m',
  },
  );
  const resetPasswordTemplatePath = path.join(TEMPLATES_DIR, 'reset-password-email.html');

  const templateSource = (await fs.readFile(resetPasswordTemplatePath)).toString();

  const template = handlebars.compile(templateSource);
  const html = template({
    name: user.name,
    link:`${getEnvVar('APP_DOMAINE')}/reset-password?token=${resetToken}`,
  });

  await sendEmail({
    from: getEnvVar(SMTP.SMTP_FROM),
    to: email,
    subject: 'Reset your password',
    html,
  });

};

export const resetPassword = async (payload) => {
  let entries;
  try {
    entries = jwt.verify(payload.token, getEnvVar('JWT_SECRET'));

  } catch (err) {
    if (err instanceof Error) throw createHttpError(401, "Token is expired or invalid.");
    throw err;
  }

  const user = await User.findOne({
    email: entries.email,
    _id: entries.sub,
  });

  if (!user) {
    throw createHttpError(404, "User not found!");
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  await User.updateOne(
    { _id: user._id },
    { password: encryptedPassword },
  );
};


