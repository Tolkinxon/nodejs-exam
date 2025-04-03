import { checkToken } from "../models/checkToken.js";
import { readFileDb } from "../models/readFile.js"

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
}