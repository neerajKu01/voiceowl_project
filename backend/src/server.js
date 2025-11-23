import dotenv from 'dotenv';
dotenv.config();
import config from 'config';
import app from './app.js';
import connectDB from './utils/mongoDbSetup.js';

const PORT = process.env.PORT || config.get('app.port');

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
