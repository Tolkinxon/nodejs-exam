import { CliesntError, globalError } from "./error.js";

const regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function loginValidator(res, {email, password}){
    try {
        if(!email) throw new CliesntError('Email required!', 400);
        if(!password) throw new CliesntError('Password required!', 400  );
        if(!(regExp.test(email))) throw new CliesntError('Invalid email', 400);
        return true;
    } catch (error) {
        globalError(res, error);
    }
}

export function clientValidator(res, {email, username, phone, createdAt, password}){
    try {
        if(!email) throw new CliesntError('Email required!', 400);
        if(!phone) throw new CliesntError('Phone number required!', 400);
        if(!createdAt) throw new CliesntError('createdAt required!', 400);
        if(!username) throw new CliesntError('Username required!', 400  );
        if(!password) throw new CliesntError('Password required!', 400  );
        if(!(regExp.test(email))) throw new CliesntError('Invalid email', 400);
        return true;
    } catch (error) {
        globalError(res, error);
    }
}