const { Router } = require("express");
const Task = require("../models/task.model");
const verifyToken = require("../middlewares/auth");
const task = Router();

// Create a new task
task.post("/create", verifyToken, async (req, res) => {
  try {
    const { title, description, dueDate, assignee, status } = req.body;
    const createdBy = req.user.userId;
    console.log("createdBy: ", createdBy);

    const newTask = await Task.create({
      title,
      description,
      dueDate,
      assignee,
      status,
      createdBy,
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all tasks
task.get("/", verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update a task
task.patch("/update/:taskId", verifyToken, async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      req.body
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete a task
task.delete("/delete/:taskId", verifyToken, async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      id: req.params.taskId,
      createdBy: req.user.userId,
    });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(204).json({ success: "deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = task;
