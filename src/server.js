import express from 'express';
import cors from 'cors';
import serverConfig from './config.js';
const { PORT } = serverConfig;
const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/employees', (req, res)=>{
    console.log(req.url);
})

app.listen(PORT, ()=>{
    console.log(`Server is runnig on port ${PORT}`);
})