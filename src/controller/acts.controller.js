import { readFileDb } from "../models/readFile.js"

export const actsController = {
    GET: async function (req, res){
        const acts = await readFileDb('acts');
        res.json(acts);       
    }
}