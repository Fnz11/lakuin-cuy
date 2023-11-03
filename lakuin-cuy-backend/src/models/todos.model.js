const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todosSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  star: {
    type: Boolean,
    default: false,
    required: true,
  },
  color: {
    type: String,
    required: true,
  }
});

const Todos = mongoose.model("todos", todosSchema);

module.exports = Todos;
