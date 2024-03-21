import User from "../models/user.model.js";

export const getPerfil = (req, res) => {
  const {username, admin} = req.user;

  const user = User.findOne({username})

  res.render("perfil", {
    username,
    admin,
    email: user.email
  });
};
