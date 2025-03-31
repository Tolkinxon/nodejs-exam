import fs from "node:fs/promises";
import serverConfig from "../config.js";
const { dbPath } = serverConfig

export const readFileDb = async (fileName) => {
    let read = await fs.readFile(dbPath(fileName), 'utf-8');
    return read ? JSON.parse(read) : [];
}   

