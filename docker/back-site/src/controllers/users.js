const {
  signupUser,
  loginUser,
  currentUser,
  logoutUser,
  refreshMToken,
  getAllUsers,
  deleteOneUser,
  getInfo,
} = require("../services/users");

const signinUserController = async (req, res, next) => {
  const { token, email, name, phone, avatarURL, refreshToken } =
    await loginUser(req.body);
  res.status(201).json({
    contentType: "application/json",
    ResponseBody: {
      user: {
        name,
        email,
        phone,
        avatarURL,
      },
      token,
      refreshToken,
    },
  });
};

const logoutUserController = async (req, res, next) => {
  await logoutUser(req.user.token);
  res.sendStatus(204);
};

const signupUserController = async (req, res, next) => {
  const { token, email, name, phone, avatarURL, refreshToken } =
    await signupUser(req.body);
  res.status(201).json({
    contentType: "application/json",
    ResponseBody: {
      user: {
        name,
        email,
        phone,
        avatarURL,
      },
      token,
      refreshToken,
    },
  });
};

const getCurrentUserController = async (req, res, next) => {
  const user = await currentUser(req.user.token);
  res.status(200).send(user);
};

const refreshTokenController = async (req, res, next) => {
  // console.log('req.persistedToken', req.user.token)
  const user = await refreshMToken(req.user.token);
  res.status(200).send(user);
};

const getUsers = async (req, res, next) => {
  const users = await getAllUsers();
  res.status(200).send(users);
};
const getUserInfo = async (req, res, next) => {
  const user = await getInfo(req.body);
  res.status(200).send(user);
};
const deleteUser = async (req, res, next) => {
  await deleteOneUser(req.params.userId);
  res.sendStatus(204);
};

module.exports = {
  signupUserController,
  signinUserController,
  logoutUserController,
  getCurrentUserController,
  refreshTokenController,
  getUsers,
  deleteUser,
  getUserInfo,
};
