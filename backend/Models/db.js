const mongoose =require("mongoose");
const dotenv=require('dotenv')
dotenv.config()
mongoose.set('strictQuery', true);

 mongoose.connect(process.env.DB_CONNECT)
.then(()=>{
    console.log("successfully connected to db")
}).catch((e)=>{
    console.log("some error to connected db",e)
})
