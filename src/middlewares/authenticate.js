import createHttpError from "http-errors";

import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export const authenticate = async (req, res, next) => {
    try {
    // 1. Перевірка наявності accessToken у куках
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return next(createHttpError(401, 'Missing access token'));
    }

    // 2. Пошук сесії за accessToken
    const session = await Session.findOne({ accessToken });

    if (!session) {
      return next(createHttpError(401, 'Session not found'));
    }

    // 3. Перевірка, чи не прострочений accessToken
    const isExpired = new Date() > new Date(session.accessTokenValidUntil);

    if (isExpired) {
      return next(createHttpError(401, 'Access token expired'));
    }

    // 4. Пошук користувача, пов’язаного з сесією
    const user = await User.findById(session.userId);

    if (!user) {
      return next(createHttpError(401));
    }

    // 5. Збереження користувача в req.user
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
