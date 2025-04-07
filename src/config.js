import dotenv from 'dotenv';
dotenv.config();
import path from "node:path";

const serverConfig = {
    dbPath: (fileName) => path.join(process.cwd(), 'db', fileName + '.json'),
    publicPath: (url) => path.join(process.cwd(), 'public', url),
    viewsPath: (fileName) => path.join(process.cwd(), 'src', 'views', fileName),
    PORT: process.env.PORT || 3000,
    mimeTypes: {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/favascript",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".ico": "image/x-icon",
    }
}

export default  serverConfig;