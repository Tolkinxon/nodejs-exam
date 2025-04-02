import { readFileDb } from "../models/readFile.js"
import { CliesntError, globalError } from "../utils/error.js";
import { validator } from "../utils/validator.js";

export const authController = {
    LOGIN: async function (req, res){
        res.setHeader('Content-Type', 'application/json');
        
        const user = req.body;
        try {
            let validated = validator(res, user);
            if(validated){
                const usersArr = ['clients', 'employees', 'admins'];
                for(let fileName of usersArr){
                    const users = await readFileDb(fileName);
                    const foundUser = users.find(item => item.email == user.email);
                    if(foundUser && foundUser !== -1) {
                        if(foundUser.password == user.password) return res.status(200).json({...foundUser, role: fileName});
                    }
                }
                throw new CliesntError('This user not found', 401)
            }
        } catch (error) {
            globalError(res, error)
        }
        
    }
}