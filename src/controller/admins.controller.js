import { checkToken } from "../models/checkToken.js";
import { readFileDb } from "../models/readFile.js"
import { writeFileDb } from "../models/writeFile.js";
import { CliesntError, globalError, ServerError } from "../utils/error.js";

export const adminsController = {
    GET: async function (req, res){
        const employee = await checkToken(req, res);
        return res.status(200).json(employee); 
    },
    PUT: async function (req, res) {
        try {
            const id = req.params.id;
            const updatedData = req.body;
            const admins = await readFileDb('admins');
            const findIndex = admins.findIndex(item => item.id == id);
            if(!(findIndex == -1)) {
                admins[findIndex] = updatedData;
                const wrFile = await writeFileDb('admins', admins); 
                if(wrFile) return res.status(201).json({message: "Admin successfully updated", status: 201});
                throw new ServerError('Something went wrong!');
            } throw new CliesntError('Not Found!');
        } catch (error) {
            globalError(res, error)
        }
    },
  
}