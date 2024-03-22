import User from "../models/user.model.js";
import { createAccessToken } from "../lib/jwt.js";
import bcryptjs from "bcryptjs";

export const getPerfil = async (req, res) => {
  const {username, admin} = req.user;

  const actualUser = await User.findOne({username})

  res.render("perfil", {
    username,
    admin,
    email: actualUser.email,
    showAlert: false,
    messageAlert: "",
    typeAlert: ""
  });
};

export const changePerfil = async (req, res) => {
  let {username, admin} = req.user
  const {newUsername, email, actualPassword, newPassword} = req.body

  const originalUser = await User.findOne({ username });

  if (newUsername && email){
    if (newUsername != username){
      const userRepeatedDb = await User.findOne({ username: newUsername });
      if (userRepeatedDb){
        return res.render("perfil", {
          username,
          admin,
          email: originalUser.email,
          showAlert: true,
          messageAlert: "El nombre de usuario que ha ingresado ya existe",
          typeAlert: "danger"
        });
      }
      const token = await createAccessToken({username: newUsername, admin });
      res.cookie("token", token);
    }
    await User.findOneAndUpdate({username}, {username: newUsername, email})
    username = newUsername
  }

  if (actualPassword && newPassword){
    const validPassword = await bcryptjs.compare(actualPassword, originalUser.password);
    if (!validPassword) {
        return res.render("perfil", {
          username,
          admin,
          email: originalUser.email,
          showAlert: true,
          messageAlert: "La contraseña que ha ingresado es incorrecta",
          typeAlert: "danger"
      });
    }
    const passwordHash = await bcryptjs.hash(newPassword, 10);
    await User.updateOne({username}, {password: passwordHash})
  }
  
  const userModified = await User.findOne({username})

  res.render("perfil", {
    username,
    admin,
    email: userModified.email,
    showAlert: true,
    messageAlert: "Los cambios han sido realizados exitosamente",
    typeAlert: "success"
  });
}