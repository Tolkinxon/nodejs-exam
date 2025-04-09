import { checkToken } from "../models/checkToken.js";
import { readFileDb } from "../models/readFile.js"
import { writeFileDb } from "../models/writeFile.js";
import { globalError, ServerError } from "../utils/error.js";
import { actsValidate } from "../utils/joi.js";

export const actsController = {
    GET: async function (req, res){
        const acts = await readFileDb('acts');
        res.json(acts);       
    },
    EMPLOYEE: async function (req, res){
        const acts = await readFileDb('acts');
        const technics = await readFileDb('technics');
        const clients = await readFileDb('clients');
        const employee = await checkToken(req, res);
        if(employee) {
            const employeeOrders = acts.filter(item => item.emp_id == employee.id);
            const employeeOrdersMapped = employeeOrders.map(item => {
                const foundName = technics.find(technicsItem => technicsItem.id == item.tech_id);
                const foundClientName = clients.find(clientsItem => clientsItem.id == item.client_id);
                return {...item, name: foundName.name, clientName: foundClientName.username};
            })
            res.json(employeeOrdersMapped);       
        }
    },
    CLIENT: async function (req, res){
        const acts = await readFileDb('acts');
        const technics = await readFileDb('technics');
        const employee = await readFileDb('employees');
        const client = await checkToken(req, res);
        if(client) {
            const clientOrders = acts.filter(item => item.client_id == client.id);
            const clinetOrdersMapped = clientOrders.map(item => {
                const foundName = technics.find(technicsItem => technicsItem.id == item.tech_id);
                const foundEmployeeName = employee.find(employeeItem => employeeItem.id == item.emp_id);
                return {...item, name: foundName.name, employeeName: foundEmployeeName.username};
            })
            res.json(clinetOrdersMapped);       
        }
    },
    PUT: async function(req, res) {
        try {
                const id = req.params.id;
                const updatedData = req.body;
                const acts = await readFileDb('acts');
                const findIndex = acts.findIndex(item => item.id == id);
                    if(!(findIndex == -1)) {
                        acts[findIndex] = {...acts[findIndex], ...updatedData};
                        const wrFile = writeFileDb('acts', acts); 
                        if(wrFile) return res.status(201).json({message: "Orders successfully updated", status: 201});
                        throw new ServerError('Something went wrong!');
                    } throw new CliesntError('Not Found!');
                } catch (error) {
                    globalError(res, error)
                }
    },
    POST: async function (req, res){
        const newAct = req.body;
        const { error } = actsValidate.validate(newAct);
        const err = error?.details[0].message;
        try {
            if(!error){
               const acts = await readFileDb('acts');
               newAct.id = acts.length ? acts.at(-1).id + 1:1;
               acts.push(newAct);
               const isWrite = await writeFileDb('acts', acts);
               if(isWrite) return res.status(200).json({message: "This action successfully added", status: 200}); 
               throw new ServerError('Something went wrong!');
            } else return res.status(400).json({error: err, status: 400});
           }
         catch (error) {
            globalError(res, error);
        }
    },
}