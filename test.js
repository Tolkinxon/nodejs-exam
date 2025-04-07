import fs from "node:fs";
import { sendFile } from "./src/middlewares/sendFile.js";

        
const arrHtml= fs.readdirSync('./src/views');
const arrAllFIles = fs.readdirSync('./public/js');
console.log(arrAllFIles);

function makeRoutes(app){
    for(let route of arrHtml){
        const r = '/'+ route;
        app.get(r,(req, res)=>{
            sendFile(route, res, false);
        })
    }
    for(let route of arrAllFIles){
        const r = '/'+ route;
        app.get(r,(req, res)=>{
            sendFile("/js/"+route, res, true);
        })
    }
};

export default makeRoutes;
