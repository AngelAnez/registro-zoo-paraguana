import { verifyAccessToken } from "../lib/jwt.js";

export const validateToken = (req, res, next) => {
    const {token} = req.cookies
    if (token && verifyAccessToken(token)){
        req.user = verifyAccessToken(token)
        return next();
    }
    console.log("Un usuario sin autorización ha intentado acceder a " + req.path);
    return res.redirect("/login");
};