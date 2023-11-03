const User = require("../models/user.model");

// FIND BY EMAIL
const getUserWEmailRepo = async (email) => {
  const userData = await User.findOne({ email });
  return userData;
};

// FIND BY USERNAME
const getUserWUsernameRepo = async (username) => {
  const userData = await User.findOne({ username });
  return userData;
};

// POST
const postUserRepo = async (data) => {
  const { username, email, password } = data;
  const user = new User({ username, email, password });
  await user.save();
  return user;
};

module.exports = {
  getUserWEmailRepo,
  getUserWUsernameRepo,
  postUserRepo,
};
