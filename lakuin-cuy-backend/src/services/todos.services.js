const {
  getTodosRepo,
  postTodosRepo,
  patchTodosRepo,
  deleteTodosRepo,
} = require("../repository/todos.repository");

// GET
const getTodosService = async (username) => {
  const todosData = await getTodosRepo({ user: username });
  return todosData;
};

// POST
const postTodosService = async (data) => {
  if (!data) {
    throw new Error("Data tidak ada");
  }
  const { title, body, time, category, color, username } = data;
  const todosData = await postTodosRepo({
    user: username,
    title,
    body,
    time,
    category,
    color,
  });
  await getTodosRepo({ user: username });
  return todosData;
};

// PATCH
const patchTodosService = async (data) => {
  
  if (!data) {
    throw new Error("Data tidak ada");
  }
  
  const { title, body, time, category, color, star, id } = data;
  const todoData = await patchTodosRepo({
    _id: id,
    title,
    body,
    time,
    star,
    category,
    color,
  });
  return todoData;
};

// DELETE
const deleteTodosService = async (id) => {
  await deleteTodosRepo(id);
};

module.exports = {
  getTodosService,
  postTodosService,
  patchTodosService,
  deleteTodosService,
};
