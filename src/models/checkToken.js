import { tokenServise } from "../lib/jwt/jwt.js";
import { globalError } from "../utils/error.js";
import { readFileDb } from "./readFile.js";

export const checkToken = async (req, res) => {
    try{
        const token = req.headers.authorization;
        if(!token) throw new CliesntError('Unauthorized', 401);
        let verifyToken = tokenServise.verifyToken(token);
        const role = verifyToken.role;
        const users = await readFileDb(role);
        if(!(verifyToken.userAgent == req.headers['user-agent'])) throw new CliesntError('Token is invalid', 401);
        if(!(users.some(item => item.email == verifyToken.email))) throw new CliesntError('Token is invalid', 401);
        const foundUser = users.find(item => item.email == verifyToken.email);
        return {...foundUser, role};
    }
    catch(error){
        globalError(res, error);
    }
}

// createToken({user_id: user.id, userAgent: req.headers['user-agent']})