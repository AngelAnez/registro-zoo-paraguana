import jwt from "jsonwebtoken";
import { TOKEN_SECRET_KEY } from "../global.js";

export const createAccessToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, TOKEN_SECRET_KEY, {
        expiresIn: "1d"
        }, (err, token) => {
            if (err) reject()
            resolve(token)
        })
    })
}