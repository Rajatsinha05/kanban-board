const express=require("express")
const connectDB = require("./config/db")
const router = require("./routes/user.route")
const task = require("./controllers/task.controller")
require("dotenv").config()
const cors=require("cors")
const app=express()
app.use(cors())
app.use(express.json())
let PORT=process.env.PORT||8090
app.use("/user",router)
app.use("/task",task)
app.get("/",(req,res)=>{
    res.send({msg:"hello world"})
})
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    connectDB()
})