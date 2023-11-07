const mongoose =require("mongoose");
const validator =require("validator")


// create users schema

const usersSchema =new mongoose.Schema({
    firstname:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw Error("not valid Email")
            }
        }
    },
    mobile:{
        type:String,
        require:true,
        unique:true,
        minlength:10,
        maxlength:10
    },
    gender:{
        type:String,
        require:true
    },
    status:{
        type:String,
        Enumerator:["Active","In-Active"],
        default:"Active"
    },
    datecreated:Date,
    dateUpdated:Date
    
})

//model define 

const users=new mongoose.model('users',usersSchema);

module.exports=users;