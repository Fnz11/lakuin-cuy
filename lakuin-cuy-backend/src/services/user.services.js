const {
  getUserWEmailRepo,
  getUserWUsernameRepo,
  postUserRepo,
} = require("../repository/user.repository");

// GET BY EMAIL
const getUserWEmailService = async (email) => {
  const userData = await getUserWEmailRepo(email);
  if (!userData) {
    return;
  }
  return userData;
};

// GET BY USERNAME
const getUserWUsernameService = async (username) => {
  const userData = await getUserWUsernameRepo(username);
  if (!userData) {
    return;
  }
  return userData;
};

// POST
const postUserService = async (data) => {
  const { username, email, hashPassword } = data;
  const user = await postUserRepo({ username, email, password: hashPassword });
  return user;
};

module.exports = {
  getUserWEmailService,
  getUserWUsernameService,
  postUserService,
};
