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
        res.statusCode = status;
        // res.writeHeader(status, {"content-type": "application/json"});
        res.setHeader('Content-Type', 'application/json');
    return res.status(status).json({message: err.message, status});
}                   