import {verifyAccessToken} from "../lib/jwt.js";

export const activeSession = (req, res, next) => {
  const {token} = req.cookies
    if (token && verifyAccessToken(token)){
      req.user = verifyAccessToken(token)
      console.log(`El usuario ${req.user.username} tiene su sesión abierta`);
      return res.redirect("/inicio");        
    }
    next();
};
