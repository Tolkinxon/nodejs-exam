import { tokenServise } from "../lib/jwt/jwt";
import { globalError } from "../utils/error";
// import { readFile } from "./readFile";

export const checkToken = async (req, res) => {
    try{
        const token = req.headers.token;
        if(!token) throw new CliesntError('Unauthorized', 401);
        let verifyToken = tokenServise.verifyToken(token);
        console.log(verifyToken.role);
        

        // let users = await readFile('users.json');
        // if(!(users.some(item => item.id == verifyToken.user_id))) throw new CliesntError('Token is invalid', 401);
        // if(!(verifyToken.userAgent == req.headers['user-agent'])) throw new CliesntError('Token is invalid', 401);

        return true;
    }
    catch(error){
        globalError(res, error);
    }
}

// createToken({user_id: user.id, userAgent: req.headers['user-agent']})