import { readFileDb } from "../models/readFile.js"
import { writeFileDb } from "../models/writeFile.js";
import { clientValidator } from "../utils/validator.js";

export const clientsController = {
    GET: async function (req, res){
        const clients = await readFileDb('clients');
        res.json(clients);       
    },
    POST: async function (req, res){
        const client = req.body;
        const validate = clientValidator(res, client);
        if(validate){
            const clients = await readFileDb('clients');
            const isExcist = clients.find(item => item.email == client.email);
            console.log(isExcist);
            
            if(isExcist) return res.status(200).json({message: 'This user already excist', status: 200, id:isExcist.id});
            client.id = clients.length ? clients.at(-1).id + 1 : 1;
            clients.push(client);
            const isWrite = writeFileDb('clients', clients);
            if(isWrite) return res.status(200).json({message: 'This user successfully added.', status: 200, id:client.id});
            return res.status(400).json({message: 'Something went wrong', status: 400});
        }
    }
}