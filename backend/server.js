import express from 'express';
import dotenv from 'dotenv';
import router from './routes/common.js'
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger-output.json' with { type: 'json' };

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["https://verto-hackathon.vercel.app", "http://localhost:5173"],
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Create a write stream (for error logging only)
const errorLogStream = fs.createWriteStream(path.join(process.cwd(), "./logs/errorlogs.log"), {
  flags: "a",
});

// Reading Error logs through route
app.get('/api/logs/errors', (req, res) => {
  try {
    const logPath = path.join(process.cwd(), "./logs/errorlogs.log");
    
    if (!fs.existsSync(logPath)) {
      return res.json({ success: true, data: [], message: 'No error logs found' });
    }
    
    const logData = fs.readFileSync(logPath, 'utf8');
    const logs = logData.trim().split('\n').filter(line => line.length > 0);
    
    res.json({ success: true, data: logs, message: 'Error logs retrieved successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to read error logs' });
  }
});

app.use(router);

app.use((error, req, res, next)=>{
    errorLogStream.write(`[${new Date().toLocaleString()}] ERROR: ${error.message} - ${req.method} ${req.url}\n`);
    console.error(error.message);
    return res.status(500).json({status:500, success:false, message:'Internal Server Error'})
})

const PORT = process.env.PORT || 5555
app.listen(PORT, (error)=>{
    if(error){
        errorLogStream.write(`[${new Date().toLocaleString()}] SERVER STARTUP ERROR: ${error.message}\n`);
        console.log(error);
        process.exit(1);
    }

    console.log('Running...');
})