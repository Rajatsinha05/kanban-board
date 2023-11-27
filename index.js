const express=require("express")
const connectDB = require("./config/db")
const router = require("./routes/user.route")

require("dotenv").config()
const cors=require("cors")
const task = require("./routes/task.route")
const app=express()
app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT,PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
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