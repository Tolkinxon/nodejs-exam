import { readFileDb } from "../models/readFile.js"

export const employeesController = {
    GET: async function (req, res){
        const employees = await readFileDb('employees');
        res.json(employees);       
    }
}