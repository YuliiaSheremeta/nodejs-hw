import { registerNewUser, authenticateUser,logoutUserSession,refreshAccessToken,sendResetUserToken,resetUserPassword } from '../services/auth.js';


export const registerUser = async (req, res) => {
    const user = await registerNewUser(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully registered a user!",
        data: user,
    });
};

export const loginUser = async (req, res) => {
    const user = await authenticateUser(req.body,res);

    res.json({
        status: 200,
        message: 'Successfully logged in an user!',
        data: user,
      });
};

export const logoutUser = async (req, res) => {
    if (req.cookies.sessionId) {
        await logoutUserSession(req.cookies.sessionId);
    }

    res.clearCookie('sessionId');
  res.clearCookie('refreshToken');
  res.clearCookie('accessToken');
    res.status(204).send();
};

export const refreshUserSession = async (req, res) => {
    const session = await refreshAccessToken({
      sessionId: req.cookies.sessionId,
      refreshToken: req.cookies.refreshToken,
    },res);

    res.json({
      status: 200,
      message: "Session refreshed",
      data: {
        accessToken: session.accessToken,
      },
    });
  };

export const requestResetEmail = async (req, res) => {
  await sendResetUserToken(req.body.email);
  res.json({
    status: 200,
    message: 'Password reset email sent successfully',
    data: {}
  });
};

export const resetPassword = async (req, res) => {
  await resetUserPassword(req.body);
  res.json({
    status: 200,
    message: 'Password reset successfully',
    data: {}
  });
};
