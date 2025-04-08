import { checkToken } from "../models/checkToken.js";
import { readFileDb } from "../models/readFile.js"
import { writeFileDb } from "../models/writeFile.js";
import { CliesntError, globalError, ServerError } from "../utils/error.js";
import { employeeValidate } from "../utils/joi.js";
import { employeeValidator } from "../utils/validator.js";

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
            console.log(updatedData);
            

            const employees = await readFileDb('employees');
            const findIndex = employees.findIndex(item => item.id == id);
            if(!(findIndex == -1)) {
                employees[findIndex] = {...employees[findIndex],...updatedData};
                const wrFile = await writeFileDb('employees', employees); 
                if(wrFile) return res.status(201).json({message: "Employee successfully updated", status: 201});
                throw new ServerError('Something went wrong!');
            } throw new CliesntError('Not Found!');
        } catch (error) {
            globalError(res, error)
        }
    },
    POST: async function (req, res){
        try {
            const employee = req.body;
            const { error } = employeeValidate.validate(employee);
            const err = error?.details[0].message;
            if(!error){
                const employees = await readFileDb('employees');
                const isExcist = employees.some(item => item.email == employee.email);
                if(isExcist) throw new CliesntError("This user already excist!", 400);
                employee.id = employees.length ? employees.at(-1).id + 1:1;
                employee.act_count = 0;
                employees.push(employee);
                const isWrite = await writeFileDb('employees', employees);
                if(isWrite) return res.status(201).json({message: "This employee successfully added", status: 201});
                throw new ServerError('Something went wrong')
            } else {
                res.status(400).json({message: err, status: 400});
            }
        } catch (error) {
            globalError(res, error)
        }
    }
}