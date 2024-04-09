import { createAccessToken } from "../lib/jwt.js";
import bcryptjs from "bcryptjs";
import { pool } from "../mysqlDb.js";

export const getPerfil = async (req, res) => {
  const {username, admin} = req.user;

  const [actualUserQuery] = await pool.query(`SELECT * FROM users WHERE username='${username}'`)
  const actualUser = actualUserQuery[0]

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

  const [originalUserQuery] = await pool.query(`SELECT * FROM users WHERE username='${username}'`)
  const originalUser = originalUserQuery[0]

  if (newUsername && email){
    if (newUsername != username){
      const [repeatedUserQuery] = await pool.query(`SELECT * FROM users WHERE username='${newUsername}'`)
      const repeatedUser = repeatedUserQuery[0]
      if (repeatedUser){
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
    await pool.query(`UPDATE users
    SET username = '${newUsername}', email = '${email}'
    WHERE username = '${username}';`)
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
    await pool.query(`UPDATE users
    SET password = '${passwordHash}'
    WHERE username = '${username}';`)
  }
  
  const [userModifiedQuery] = await pool.query(`SELECT * FROM users WHERE username='${username}'`)
  const userModified = userModifiedQuery[0]

  res.render("perfil", {
    username,
    admin,
    email: userModified.email,
    showAlert: true,
    messageAlert: "Los cambios han sido realizados exitosamente",
    typeAlert: "success"
  });
}