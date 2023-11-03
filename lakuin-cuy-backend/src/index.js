const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8000;

const todosControllers = require("./controllers/todos.controllers");
const {router: authControllers} = require("./controllers/auth.controllers")

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PATCH", "DELETE"], // Tambahkan PATCH di sini
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/api/auth", authControllers)
app.use("/api/todos", todosControllers);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connect to DB and listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error DB: ", err);
  });
