import { getUsers } from "../models/users.js";

export const getPerfil = (req, res) => {
  const {username, admin} = req.user;

  const users = getUsers()
  const userInfo = users.find(user => user.username == username)

  res.render("perfil", {
    username,
    admin,
    email: userInfo.email
  });
};
