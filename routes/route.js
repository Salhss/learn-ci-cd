const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

router.post("/todo", async (req, res, next) => {
  try {
    const { activity, status, date, description } = req.body;
    if (!activity || !status || !date || !description)
      throw { name: "Empty Fields" };

    const todo = new Todo(req.body);
    await todo.save();

    res.status(201).json(todo);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/todo", async (req, res, next) => {
  try {
    const todos = await Todo.find();

    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
