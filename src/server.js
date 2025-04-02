import express from 'express';
import cors from 'cors';
import serverConfig from './config.js';
import { employeesController } from './controller/employees.controller.js';
import { actsController } from './controller/acts.controller.js';
import { clientsController } from './controller/clients.controller.js';
import { technicsController } from './controller/technics.controller.js';
import { pricesController } from './controller/prices.controller.js';
import { authController } from './controller/auth.controller.js';
const { PORT } = serverConfig;

const app = express();
app.use(cors());
app.use(express.json());


app.get('/api/employees', employeesController.GET);
app.get('/api/acts', actsController.GET);
app.get('/api/clients', clientsController.GET);
app.get('/api/technics', technicsController.GET);
app.get('/api/prices', pricesController.GET);

app.post('/api/auth/login', authController.LOGIN);

app.listen(PORT, ()=>{
    console.log(`Server is runnig on port ${PORT}`);
})