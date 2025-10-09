import mongoose from "mongoose";
import { getEnvVar } from '../utils/getEnvVar.js';

export const initMongoConnection = async () => {
   try {
      const user = getEnvVar('MONGODB_USER');
      const pwd = getEnvVar('MONGODB_PASSWORD');
      const url = getEnvVar('MONGODB_URL');
      const db = getEnvVar('MONGODB_DB');


      await mongoose.connect(`mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`,);

      console.log('✅ MongoDB connection established successfully');
   } catch (e) {
      console.error('Error connecting to MongoDB:', e);
      throw e;
   }
};
