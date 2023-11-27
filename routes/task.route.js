const { Router } = require("express");
const { Create, Get, Update, Delete } = require("../controllers/task.controller");
const verifyToken = require("../middlewares/auth");
const task = Router();
task.post("/create", verifyToken,Create)
task.get("/", verifyToken,Get)
task.patch("/update/:taskId", verifyToken,Update)
task.delete("/delete/:taskId", verifyToken,Delete)
module.exports = task