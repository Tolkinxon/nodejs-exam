import { checkToken } from "../models/checkToken.js";
import { readFileDb } from "../models/readFile.js"
import { writeFileDb } from "../models/writeFile.js";
import { globalError, ServerError } from "../utils/error.js";
import { clientValidator } from "../utils/validator.js";

export const clientsController = {
    GET: async function (req, res){
        const token = req.headers.authorization;
        if(token) {
            const client = await checkToken(req, res);
            return res.status(200).json(client);      
        } 
        if(token == undefined) {
            const clients = await readFileDb('clients');
            res.json(clients);  
        }
    },
    POST: async function (req, res){
        const client = req.body;
        const validate = clientValidator(res, client);
        if(validate){
            try {
                const clients = await readFileDb('clients');
                const isExcist = clients.find(item => item.email == client.email);
                if(isExcist) return res.status(200).json({message: 'This user already excist', status: 200, id:isExcist.id});
                client.id = clients.length ? clients.at(-1).id + 1 : 1;
                clients.push(client);
                const isWrite = writeFileDb('clients', clients);
                if(isWrite) return res.status(200).json({message: 'This user successfully added.', status: 200, id:client.id});
                throw new ServerError('Something went wrong!')
            } catch (error) {
                globalError(res, error);
            }
        }
    },
    PUT: async function (req, res) {
        try {
            const id = req.params.id;
            const updatedData = req.body;
            const clients = await readFileDb('clients');
            const findIndex = clients.findIndex(item => item.id == id);
            if(!(findIndex == -1)) {
                clients[findIndex] = updatedData;
                const wrFile = await writeFileDb('clients', clients); 
                if(wrFile) return res.status(201).json({message: "Client successfully updated", status: 201});
                    throw new ServerError('Something went wrong!');
                } throw new CliesntError('Not Found!');
            } catch (error) {
                globalError(res, error)
            }
        }
}