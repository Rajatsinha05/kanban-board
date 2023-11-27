const Task = require("../models/task.model");
const verifyToken = require("../middlewares/auth");

// Create a new task
const Create = async (req, res) => {
  try {
    const { title, description, dueDate, assignee, status } = req.body;
    const createdBy = req.user.userId;

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
};

// Get all tasks
const Get = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a task
const Update = async (req, res) => {
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
};

// Delete a task
const Delete = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.taskId);
    console.log(deletedTask);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(204).json({ success: "deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = { Create, Update, Get, Delete };
