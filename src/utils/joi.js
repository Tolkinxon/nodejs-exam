import Joi from 'joi';

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const parolPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const phonePattern = /^9989[012345789][0-9]{7}$/;

export const employeeValidate = Joi.object(
    {
        username: Joi.string().min(3).max(20).required().messages({'any.required':'Username is requeired!', }),
        createdAt: Joi.string().min(3).max(20).required().messages({'any.required':'Created at is requeired!'}), 
        phone_num: Joi.string().min(3).max(20).pattern(phonePattern).required().messages({'string.pattern.base':'Incorrect phone number!',  'any.required':'Phone number is requeired!'}),
        email: Joi.string().min(3).max(20).pattern(emailPattern).required().messages({'string.pattern.base':'Incorrect email!', 'any.required':'Email is requeired!'}),
        password: Joi.string().min(3).max(20).pattern(parolPattern).required().messages({'string.pattern.base':'Incorrect password!', 'any.required':'Password is requeired!'})
    }
)

export const actsValidate = Joi.object(
    {
        createdAt: Joi.string().min(3).max(20).required().messages({'any.required':'Created at is requeired!'}), 
        date: Joi.string().min(2).max(20).required().messages({'any.required':'date is requeired!'}),
        total_price: Joi.number().required().messages({'any.required':'Total is required!'}),
        tech_id: Joi.number().required().messages({'any.required':'Technics is required xoxo'}),
        emp_id: Joi.number().required().messages({'any.required':'Employee is required!'}),
        status: Joi.number().required().messages({'any.required':'Status is required!'}),
        client_id: Joi.number().required().messages({'any.required':'Client id is required!'})
    }
)

export const clientValidate = Joi.object(
    {
        username: Joi.string().min(3).max(20).required().messages({'any.required':'Username is requeired!'}),
        createdAt: Joi.string().min(3).max(20).required().messages({'any.required':'Created at is requeired!'}),
        phone: Joi.string().min(3).max(20).pattern(phonePattern).required().messages({'string.pattern.base':'Incorrect phone number!'}),
        email: Joi.string().min(3).max(20).pattern(emailPattern).required().messages({'string.pattern.base':'Incorrect email!'}),
        password: Joi.string().min(3).max(20).pattern(parolPattern).required().messages({'string.pattern.base':'Incorrect password!'})
    }
)

export const loginValidate = Joi.object({
    email: Joi.string().min(3).max(20).pattern(emailPattern).required().messages({'string.pattern.base':'Incorrect email!', 'any.required':'Email is requeired!'}),
    password: Joi.string().min(3).max(20).required().messages({'any.required':'Password is requeired!'})
})





