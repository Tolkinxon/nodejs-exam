import { readFileDb } from "../models/readFile.js"

export const technicsController = {
    GET: async function (req, res){
        const technics = await readFileDb('technics');
        res.json(technics);       
    }
}