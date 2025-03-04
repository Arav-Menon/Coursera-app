import express from 'express';
import userRouter from './Routes/user.js';
import adminRouter from './Routes/admin.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);

const main = async () => {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(5000, console.log("server is running"));

}

main();
