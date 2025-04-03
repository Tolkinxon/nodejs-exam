import { checkToken } from "../models/checkToken.js";
import { readFileDb } from "../models/readFile.js"
import { writeFileDb } from "../models/writeFile.js";
import { CliesntError, globalError, ServerError } from "../utils/error.js";

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
    },
    PUT: async function (req, res) {
        try {
            const id = req.params.id;
            const updatedData = req.body;
            const employees = await readFileDb('employees');
            const findIndex = employees.findIndex(item => item.id == id);
            if(!(findIndex == -1)) {
                employees[findIndex] = updatedData;
                const wrFile = writeFileDb('employees', employees); 
                if(wrFile) return res.status(201).json({message: "Employee successfully updated", status: 201});
                throw new ServerError('Something went wrong!');
            } throw new CliesntError('Not Found!');
        } catch (error) {
            globalError(res, error)
        }
    }
}