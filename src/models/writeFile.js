import fs from "node:fs/promises";
import serverConfig from "../config.js";
const { dbPath } = serverConfig

export const writeFileDb = async (fileName, data) => {
    await fs.writeFile(dbPath(fileName), JSON.stringify(data, null, 4));
    return true;
}  

 