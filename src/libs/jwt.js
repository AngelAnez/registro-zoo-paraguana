import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.TOKEN_SECRET_KEY;

export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: "10h",
      },
      (err, token) => {
        if (err) reject();
        resolve(token);
      }
    );
  });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return false;
    return user;
  });
};
