import mongoose from "mongoose"


export const ConnectDb=async()=>{
    try {
      const response= await mongoose.connect(process.env.MONGOURI)
      if(response){
        console.log("Connected to Host:",response.connection.host)
      }
    } catch (error) {
        console.log("error is :",error)
    }
}