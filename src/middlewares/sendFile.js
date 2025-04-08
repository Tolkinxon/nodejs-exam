import serverConfig from "../config.js";
import path from "node:path";
const { publicPath, viewsPath, mimeTypes } = serverConfig;
import fs from 'node:fs';
import fsPromise from 'node:fs/promises'
import { CliesntError, globalError } from "../utils/error.js";


export const sendFile = async (file, res, isStatic = false) => {
    const fullPath = isStatic ? publicPath(file) : viewsPath(file);
    try {
        if(fs.existsSync(fullPath)) {
            const contentType = mimeTypes[path.extname(fullPath)];
            res.writeHead(200, {"content-type": `${contentType}`})
            const file = await fsPromise.readFile(fullPath);
            return res.end(file);
        } else {
            throw new CliesntError('File not found', 404);
        }
    } catch (error) {
        globalError(res, error)
    }
}