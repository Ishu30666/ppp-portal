import mongoose from "mongoose"

const UserSchema=mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    }
},{timeStamp:true})

const User=mongoose.model("User",UserSchema)

export default User