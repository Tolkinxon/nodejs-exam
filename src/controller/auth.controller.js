import { readFileDb } from "../models/readFile.js"
import { CliesntError, globalError } from "../utils/error.js";
import { checkToken } from "../models/checkToken.js";
import { loginValidator } from "../utils/validator.js";
import { tokenServise } from "../lib/jwt/jwt.js";
const { createToken } = tokenServise;

export const authController = {
    LOGIN: async function (req, res){
        const user = req.body;
        try {
            let validated = loginValidator(res, user);
            if(validated){
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
                throw new CliesntError('This user not found', 401)
            }
        } catch (error) {
            globalError(res, error)
        } 
        
    },

    CHECKTOKEN: async function (req, res) {
        const foundUser = await checkToken(req, res);
        res.json(foundUser);
    }
}