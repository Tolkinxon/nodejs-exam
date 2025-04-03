import dotenv from 'dotenv';
dotenv.config();
import path from "node:path";

const serverConfig = {
    dbPath: (fileName) => path.join(process.cwd(), 'db', fileName + '.json'),
    PORT: process.env.PORT || 3000
}

export default  serverConfig;