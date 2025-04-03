import jsonwebtoken from "jsonwebtoken";
const { sign, verify } = jsonwebtoken;

export const tokenServise = {
    createToken: (payload) => sign(payload, process.env.TOKEN_KEY, {expiresIn: '7d'}) ,
    verifyToken: (token) => verify(token, process.env.TOKEN_KEY)
}