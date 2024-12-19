import mongoose from "mongoose";
const connectDB = async () =>{
    try{
       const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/madhavDb`);
       console.log(`\n MongoDb Connected ! DB_Host : ${connectionInstance.connection.host}`);
    }catch(error){
        console.log("Error couldn't connect to the Database" , error);
        process.exit(1);
    }
}

export default connectDB;