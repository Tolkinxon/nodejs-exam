import { checkToken } from "../models/checkToken.js";
import { readFileDb } from "../models/readFile.js"

export const employeesController = {
    GET: async function (req, res){
        const token = req.headers.authorization;
        if(token) {
            const employee = await checkToken(req, res);
            return res.status(200).json(employee);      
        } 
        if(token == undefined) {
            const employees = await readFileDb('employees');
            return res.status(200).json(employees);  
        }
    }
}