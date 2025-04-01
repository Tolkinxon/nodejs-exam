import { readFileDb } from "../models/readFile.js"
import { validator } from "../utils/validator.js";

export const userController = {
    LOGIN: async function (req, res){
        res.setHeader('Content-Type', 'application/json');
        const user = req.body;
        let validated = validator(res, user);
        if(validated){
            const usersArr = ['clients', 'employees', 'admins'];
            for(let fileName of usersArr){
                const users = await readFileDb(fileName);
                const foundUser = users.find(item => item.email == user.email);
                if(foundUser && foundUser !== -1) {
                    if(foundUser.password == user.password) return res.json({role: fileName});
                }
                
            }
        }
        else res.json({message:"This user not found!"});     
    }
}