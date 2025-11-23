import mongoose from 'mongoose';
import { config } from 'dotenv';

const connectDB = async () => {
  try {
    const connectionResp = await mongoose.connect(
      process.env.MONGODB_URI || config.get('db_services_dtl.mongodb_uri')
    );
    console.log(`\n MongoDB connected !! DB HOST: ${connectionResp.connection.host}`);
  } catch (error) {
    console.error('MongoDB Connection FAILED:', error);
    process.exit(1);
  }
};

export default connectDB;
