import fs from "node:fs";
import { sendFile } from "./src/middlewares/sendFile.js";

const arr = fs.readdirSync('./src/views');

function makeRoutes(app){
    for(let route of arr){
        const r = '/'+ route;
        app.get(r,(req, res)=>{
            sendFile(route, res, false);
        })
    }
};

export default makeRoutes;
