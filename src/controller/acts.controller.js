import { checkToken } from "../models/checkToken.js";
import { readFileDb } from "../models/readFile.js"
import { writeFileDb } from "../models/writeFile.js";

export const actsController = {
    GET: async function (req, res){
        const acts = await readFileDb('acts');
        res.json(acts);       
    },
    EMPLOYEE: async function (req, res){
        const acts = await readFileDb('acts');
        const technics = await readFileDb('technics');
        const employee = await checkToken(req, res);
        if(employee) {
            const employeeOrders = acts.filter(item => item.emp_id == employee.id);
            const employeeOrdersMapped = employeeOrders.map(item => {
                const foundName = technics.find(technicsItem => technicsItem.id == item.tech_id);
                return {...item, name: foundName.name};
            })
            res.json(employeeOrdersMapped);       
        }
    },
    PUT: async function(req, res) {
        try {
                const id = req.params.id;
                const updatedData = req.body;
                const acts = await readFileDb('acts');
                const findIndex = acts.findIndex(item => item.id == id);
                    if(!(findIndex == -1)) {
                        acts[findIndex] = {...acts[findIndex], ...updatedData};
                        const wrFile = writeFileDb('acts', acts); 
                        if(wrFile) return res.status(201).json({message: "Orders successfully updated", status: 201});
                        throw new ServerError('Something went wrong!');
                    } throw new CliesntError('Not Found!');
                } catch (error) {
                    globalError(res, error)
                }
    }
}