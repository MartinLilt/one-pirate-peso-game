const { Users } = require("../db/usersModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const signupUser = async (body) => {
  console.log("body :>> ", body);
  const { email, password, name, phone } = body;
  await Users.create({
    email,
    password: await bcryptjs.hash(
      password,
      Number(process.env.BCRYPT_SALT_ROUNDS)
    ),
    name,
    phone,
  });
  let user = await Users.findOne({ email });
  const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  const refreshToken = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN_REFRESH,
  });
  user = await Users.findOneAndUpdate(
    { email },
    { token, refreshToken },
    { new: true }
  );
  return user;
};

const loginUser = async (body) => {
  const { email, password } = body;
  let user = await Users.findOne({ email, verify: true });

  const isPasswordCorrect = await bcryptjs.compare(password, user.password);

  if (isPasswordCorrect) {
    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    const refreshToken = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN_REFRESH,
    });
    user = await Users.findOneAndUpdate(
      { email },
      { token, refreshToken },
      { new: true }
    );

    return user;
  }
};

const logoutUser = async (token) => {
  const user = await Users.findOneAndUpdate(
    { token },
    { token: null, refreshToken: null },
    { new: true }
  );
  return user;
};

const currentUser = async (token) => {
  const user = await Users.findOne(
    { token },
    { email: 1, name: 1, phoneNumber: 1, _id: 0 }
  );
  return user;
};

const verificationUser = async (verificationToken) => {
  const user = await Users.findOneAndUpdate(
    { verificationToken },
    {
      verificationToken: null,
      verify: true,
    },

    { new: true }
  );
  return user;
};

const refreshMToken = async (token) => {
  userOld = await Users.findOne({ token }, { email: 1, _id: 1 });

  const accessToken = jwt.sign({ sub: userOld._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  const refreshToken = jwt.sign({ sub: userOld._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN_REFRESH,
  });

  const user = await Users.findOneAndUpdate(
    { token },
    { token: accessToken, refreshToken },
    { new: true }
  );

  return user;
};

const getAllUsers = async () => {
  const result = await Users.find(
    {},
    { email: 1, _id: 1, name: 1, phone: 1, avatarURL: 1 }
  );
  return result;
};
const getInfo = async ({ email }) => {
  const result = await Users.find(
    { email },
    { email: 1, _id: 1, phone: 1, name: 1, avatarURL: 1 }
  );
  return result;
};
const deleteOneUser = async (_id) => {
  const result = await Users.findOneAndDelete({ _id });
  return result;
};

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  currentUser,
  verificationUser,
  refreshMToken,
  getAllUsers,
  deleteOneUser,
  getInfo,
};
