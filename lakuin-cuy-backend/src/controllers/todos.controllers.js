const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../controllers/auth.controllers");

const {
  getTodosService,
  postTodosService,
  patchTodosService,
  deleteTodosService,
} = require("../services/todos.services");

// GET
router.get("/:username", authenticateToken, async (req, res) => {
  const { username } = req.params;
  try {
    const todosData = await getTodosService(username);
    res.status(200).send(todosData);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//POST
router.post("/:username", authenticateToken, async (req, res) => {
  const { username } = req.params;
  const { title, time, body, category, color } = req.body;
  try {
    const newTodo = await postTodosService({
      username,
      title,
      body,
      time,
      category,
      color,
    });
    res.status(200).send(newTodo);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// PATCH
router.patch("/:username/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, time, body, category, color, star } = req.body;
  try {
    const newTodo = await patchTodosService({
      title,
      body,
      time,
      category,
      color,
      star,
      id,
    });

    res.status(200).send(newTodo);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// DELETE
router.delete("/:username/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    await deleteTodosService({ _id: id });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
