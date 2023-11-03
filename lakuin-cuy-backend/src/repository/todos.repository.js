const Todos = require("../models/todos.model");

// GET
const getTodosRepo = async (user) => {
  const todosData = await Todos.find(user);
  return todosData;
};

// POST
const postTodosRepo = async (data) => {
  const { title, body, time, category, color, user } = data;
  const todosData = await Todos.create({
    user,
    title,
    body,
    time,
    star: false,
    category,
    color,
  });
  return todosData;
};

// PATCH
const patchTodosRepo = async (data) => {
  
  const { title, body, time, category, color, star, _id } = data;
  const todoData = await Todos.findOneAndUpdate(
    { _id },
    {
      title,
      body,
      time,
      star,
      category,
      color,
    }
  );

  return todoData;
};

// DELETE
const deleteTodosRepo = async (id) => {
  await Todos.findOneAndDelete({ _id: id });
};

module.exports = {
  getTodosRepo,
  postTodosRepo,
  patchTodosRepo,
  deleteTodosRepo,
};
