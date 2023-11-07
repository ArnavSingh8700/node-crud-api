const users=require("../models/usersSchema");
const moment=require("moment");

// post
exports.userpost= async(req,res)=>{
    const {firstname,email,mobile,gender,status}=req.body;
     
    
    if(!firstname || !email || !mobile || !gender || !status){
        res.status(400).json({error:"All input is require"})
    }

    try {
        const preuser=await users.findOne({email:email});

        if(preuser){
            res.status(400).json({error:"This user already exist in our database"});

        }else{
            const dateCreate=moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
            const userData=new users({
                firstname,email,mobile,gender,status,datecreated:dateCreate
            })

            await userData.save();
            res.status(200).json(userData);
        }
    } catch (error) {
        res.status(400).json({error});
         console.log("catch block error")
    }
   
}

// get All users
exports.getUsers= async(req,res)=>{
    const sort=req.query.sort || "";
    /********** */
    //search
    const search =req.query.search || "";
    const query={
        firstname:{$regex:search,$options:"i"}
    }
    /****************** */

    try {
        const usersData= await users.find(query)
        .sort({datecreated:sort=="new" ? -1 :1})
        res.status(200).json(usersData);
    } catch (error) {
        res.status(400).json({error});
         console.log("catch block error")
    }
}

//get single user

exports.getSingleuser=async(req,res)=>{
    const {id}=req.params;
    try {
        const singleuserData=await users.findOne({_id:id});
        res.status(200).json(singleuserData)
    } catch (error) {
        res.status(400).json({error});
         console.log("catch block error")
    }
}

//delete user

exports.deleteUser=async(req,res)=>{
    const {id}=req.params;
    try {
       const deleteuserData=await users.findByIdAndDelete({_id:id}); 
       res.status(200).json(deleteuserData)
    }catch (error) {
        res.status(400).json({error});
         console.log("catch block error")
    }
}

//update

exports.updateUser=async(req,res)=>{
    const {id} =req.params;
    const {firstname,email,mobile,gender,status}=req.body;

    try {
        const dateUpdate=moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
        const updateUserdata=await users.findByIdAndUpdate({_id:id},{
            firstname,email,mobile,gender,status,dateUpdated:dateUpdate
  
        },{new:true});

        await updateUserdata.save();

        res.status(200).json(updateUserdata)
    } catch (error) {
        res.status(400).json({error});
         console.log("catch block error")
    }
}
