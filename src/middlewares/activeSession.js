import {verifyAccessToken} from "../libs/jwt.js";

export const activeSession = (req, res, next) => {
  const {token} = req.cookies
    if (token && verifyAccessToken(token)){
      req.user = verifyAccessToken(token)
      return res.redirect("/inicio");        
    }
    next();
};
