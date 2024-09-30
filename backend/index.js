const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const productRoutes = require("./Routes/productRouter")
require("./Models/db") 

app.get("/ping",(req,res)=>{
    res.send("pong")
})

app.use(express.json())
app.use(cors());
app.use("/auth", AuthRouter);

// for use aurthenticarion 
app.use("/auth",AuthRouter);
app.use("/products", productRoutes);
  

app.listen(8080,()=>{
    console.log("port Start on 8080")
})