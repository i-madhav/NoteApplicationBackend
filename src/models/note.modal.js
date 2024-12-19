import mongoose from "mongoose";
const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        lowercase:true
    },
    content:{
        type:String,
    },
    category:{
        type:String,
        enum:['personal','work','other'],
        required:true
    },
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }
},{timestamps:true});

export const Notes = mongoose.model("Notes",noteSchema);