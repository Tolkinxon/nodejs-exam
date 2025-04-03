import { CliesntError, globalError } from "./error.js";

const regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function validator(res, {email, password}){
    try {
        if(!(regExp.test(email))) throw new CliesntError('Invalid email', 400);
        if(!email) throw new CliesntError('Email required!', 400);
        if(!password) throw new CliesntError('Password required!', 400  );
        return true;
    } catch (error) {
        globalError(res, error);
    }
}