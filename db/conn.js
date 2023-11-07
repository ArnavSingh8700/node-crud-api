const mongoose=require("mongoose");

mongoose.set("strictQuery",true);
mongoose.connect("mongodb://localhost:27017/USERDB",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection successfullbty");
}).catch((e)=>{
    console.log("No connection seccessfull")
})



