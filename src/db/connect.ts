import mongoose from "mongoose"

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI as string)

  console.log('Connected to MongoDB successfully!')
}

export default connectDB;