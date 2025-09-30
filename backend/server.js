import express from 'express';
import dotenv from 'dotenv';
import router from './routes/common.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}));

app.use(router);

const PORT = process.env.PORT || 5555
app.listen(PORT, (error)=>{
    if(error){
        console.log(error);
        process.exit(1);
    }

    console.log('Running...');
})