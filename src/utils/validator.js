import { CliesntError, globalError } from "./error.js";

const regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const parolPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const phonePattern = /^9989[012345789][0-9]{7}$/;

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
        if(!(parolPattern.test(password))) throw new CliesntError('Invalid password', 400);
        if(!(phonePattern.test(phone))) throw new CliesntError('Invalid phone number', 400);
        return true;
    } catch (error) {
        globalError(res, error);
    }
}

export function employeeValidator(res, {email, username, phone_num, createdAt, password}){
    try {
        if(!email) throw new CliesntError('Email required!', 400);
        if(!phone_num) throw new CliesntError('Phone number required!', 400);
        if(!createdAt) throw new CliesntError('createdAt required!', 400);
        if(!username) throw new CliesntError('Username required!', 400  );
        if(!password) throw new CliesntError('Password required!', 400  );
        if(!(regExp.test(email))) throw new CliesntError('Invalid email', 400);
        if(!(parolPattern.test(password))) throw new CliesntError('Invalid password', 400);
        if(!(phonePattern.test(phone_num))) throw new CliesntError('Invalid phone number', 400);
        return true;
    } catch (error) {
        globalError(res, error);
    }
}

export function actsValidator(res, {client_id, date, status, createdAt, emp_id, tech_id, total_price}){
    try {
        if(!client_id) throw new CliesntError('Client id required!', 400);
        if(!date) throw new CliesntError('Date required!', 400);
        if(!(status == 0)) throw new CliesntError('Status required!', 400);
        if(!createdAt) throw new CliesntError('createdAt required!', 400  );
        if(!emp_id) throw new CliesntError('Employee id required!', 400  );
        if(!tech_id) throw new CliesntError('Technics id required!', 400  );
        if(!total_price) throw new CliesntError('Totel price required!', 400  );
     
        return true;
    } catch (error) {
        globalError(res, error);
    }
}