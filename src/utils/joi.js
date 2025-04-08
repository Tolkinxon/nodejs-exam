import Joi from 'joi';

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const parolPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const phonePattern = /^9989[012345789][0-9]{7}$/;

export const employeeValidate = Joi.object(
    {
        username: Joi.string().min(3).max(20).required().messages({'any.required':'Username is requeired!'}),
        createdAt: Joi.string().min(3).max(20).required(), 
        phone_num: Joi.string().min(3).max(20).pattern(phonePattern).required().messages({'string.pattern.base':'Incorrect phone number!'}),
        email: Joi.string().min(3).max(20).pattern(emailPattern).required().messages({'string.pattern.base':'Incorrect email!'}),
        password: Joi.string().min(3).max(20).pattern(parolPattern).required().messages({'string.pattern.base':'Incorrect password!'})
    }
)