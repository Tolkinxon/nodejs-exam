import { readFileDb } from "../models/readFile.js"

export const clientsController = {
    GET: async function (req, res){
        const clients = await readFileDb('clients');
        res.json(clients);       
    }
}