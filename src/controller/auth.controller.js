import { readFileDb } from "../models/readFile.js"
import { CliesntError, globalError } from "../utils/error.js";
import { checkToken } from "../models/checkToken.js";
import { loginValidator } from "../utils/validator.js";
import { tokenServise } from "../lib/jwt/jwt.js";
import { loginValidate } from "../utils/joi.js";
const { createToken } = tokenServise;

export const authController = {
    LOGIN: async function (req, res){
        const user = req.body;
        const { error } = loginValidate.validate(user);
        const err = error?.details[0].message;
        try {
            if(!error){
                const usersArr = ['clients', 'employees', 'admins'];
                for(let fileName of usersArr){
                    const users = await readFileDb(fileName);
                    const foundUser = users.find(item => item.email == user.email);
                    if(foundUser && foundUser !== -1) {
                        if(foundUser.password == user.password) {
                            return res.status(200).json({
                                message: "User successfully logged!", 
                                status: 200, 
                                role: fileName,
                                accessToken: createToken({...foundUser, role: fileName, userAgent: req.headers['user-agent']})});
                        }
                    }
                }
                throw new CliesntError('This user not found', 401);
            } else return res.status(400).json({error: err, status: 400});
        } catch (error) {
            globalError(res, error)
        } 
        
    },
    CHECKTOKEN: async function (req, res) {
        const foundUser = await checkToken(req, res);
        res.json(foundUser);
    },
    CHECKEMAIL:  async function (req, res){
        const user = req.body;
        console.log(user);

        try {
                    const users = await readFileDb('clients');
                    
                    const foundUser = users.find(item => item.email == user.email);
                    if(foundUser && foundUser !== -1) {
                        return res.status(200).json({
                            message: "User successfully founded!", 
                            user: foundUser,
                            status: 200, 
                        });
                    } else {
                        return res.status(200).json({
                            message: "User are not avialable", 
                            status: 200, 
                        });
                    }
        } catch (error) {
            globalError(res, error)
        } 
        
    }
}