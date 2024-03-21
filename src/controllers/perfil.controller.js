import User from "../models/user.model.js";

export const getPerfil = async (req, res) => {
  const {username, admin} = req.user;

  const actualUser = await User.findOne({username})

  res.render("perfil", {
    username,
    admin,
    email: actualUser.email
  });
};
