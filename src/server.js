import express from 'express';
import cors from 'cors';
import serverConfig from './config.js';
import { employeesController } from './controller/employees.controller.js';
import { actsController } from './controller/acts.controller.js';
import { clientsController } from './controller/clients.controller.js';
import { technicsController } from './controller/technics.controller.js';
import { pricesController } from './controller/prices.controller.js';
import { authController } from './controller/auth.controller.js';
import { adminsController } from './controller/admins.controller.js';
const { PORT } = serverConfig;

const app = express();
app.use(cors());
app.use(express.json());    

app.get('/api/admins', adminsController.GET);
app.put('/api/admins/:id', adminsController.PUT);

app.get('/api/employees', employeesController.GET);
app.post('/api/employees', employeesController.POST);
app.put('/api/employees/:id', employeesController.PUT);

app.get('/api/acts', actsController.GET);
app.post('/api/acts', actsController.POST);
app.put('/api/acts/:id', actsController.PUT);
app.get('/api/acts/employee', actsController.EMPLOYEE);
app.get('/api/acts/client', actsController.CLIENT);

app.get('/api/clients', clientsController.GET);
app.put('/api/clients/:id', clientsController.PUT);
app.post('/api/clients', clientsController.POST);


app.get('/api/technics', technicsController.GET);
app.get('/api/prices', pricesController.GET);

app.post('/api/auth/login', authController.LOGIN);
app.get('/api/auth/check-token', authController.CHECKTOKEN);

app.listen(PORT,'127.0.0.1', ()=>{
    console.log(`Server is runnig on port ${PORT}`);
})