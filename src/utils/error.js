export class CliesntError extends Error{
    constructor(message, status){
        super(message);
        this.message = `ClientError: ${message}`;
        this.status = status;
    }
}

export class ServerError extends Error{
    constructor(message){
        super(message);
        this.message = `ServerError ${message}`;
        this.status = 500;
    }
}

export const globalError = (res, err) => {
    let status = err.status || 500;
        res.type("application/json");
        res.status(status);
    return res.json({message: err.message, status});
}                   