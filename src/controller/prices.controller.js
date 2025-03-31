import { readFileDb } from "../models/readFile.js"

export const pricesController = {
    GET: async function (req, res){
        const prices = await readFileDb('prices');
        res.json(prices);       
    }
}