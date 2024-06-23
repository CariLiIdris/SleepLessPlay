import { connect } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

const dbConnect = async() => {
    try {
        await connect(MONGODB_URI, {
            dbName: 'SleepLessPlay',
        });
        console.log('Pinged your deployment. You successfully connected to MongoDB!');
    }
    catch (err) {
        console.log(`DB Connection Failed: Error ----> ${err}`);
        throw err;
    }
}

export default dbConnect