import { CliesntError, globalError } from "./error.js";

export function validator(res, {email, password}){
    try {
        if(!email) throw new CliesntError('Email required!', 404);
        if(!password) throw new CliesntError('Password required!', 404);
        return true;
    } catch (error) {
        globalError(res, error);
    }
}