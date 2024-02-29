import jwt from "jsonwebtoken";
import { TOKEN_SECRET_KEY } from "../global.js";

export const createAccessToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, TOKEN_SECRET_KEY, {
        expiresIn: "1h"
        }, (err, token) => {
            if (err) reject()
            resolve(token)
        })
    })
}

export const verifyAccessToken = (token) => {
    return jwt.verify(token, TOKEN_SECRET_KEY, (err, user) => {
        if (err) return false
        return user
    })
}