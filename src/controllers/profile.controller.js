import { createAccessToken } from "../libs/jwt.js";
import bcryptjs from "bcryptjs";
import { pool } from "../db.js";
import { DEFAULT_ALERT } from "../libs/default-alert.js";

const renderProfile = async (
  req,
  res,
  { username, admin, email, alert = DEFAULT_ALERT }
) => {
  return res.render("app/modules/profile/profile", {
    username,
    admin,
    email,
    ...alert,
  });
};

export const getProfile = async (req, res) => {
  const { username, admin } = req.user;

  const [actualUserQuery] = await pool.query(
    `SELECT * FROM users WHERE username='${username}'`
  );
  const actualUser = actualUserQuery[0];

  renderProfile(req, res, { username, admin, email: actualUser.email });
};

export const updateProfile = async (req, res) => {
  let { username, admin } = req.user;
  const { newUsername, email, actualPassword, newPassword } = req.body;

  const [originalUserQuery] = await pool.query(
    `SELECT * FROM users WHERE username='${username}'`
  );
  const originalUser = originalUserQuery[0];

  if (newUsername && email) {
    if (newUsername != username) {
      const [repeatedUserQuery] = await pool.query(
        `SELECT * FROM users WHERE username='${newUsername}'`
      );
      const repeatedUser = repeatedUserQuery[0];
      if (repeatedUser) {
        return renderProfile(req, res, {
          username,
          admin,
          email: originalUser.email,
          alert: {
            showAlert: true,
            messageAlert: "El nombre de usuario que ha ingresado ya existe",
            typeAlert: "danger",
          },
        });
      }
      const token = await createAccessToken({ username: newUsername, admin });
      res.cookie("token", token);
    }
    await pool.query(`UPDATE users
    SET username = '${newUsername}', email = '${email}'
    WHERE username = '${username}';`);
    username = newUsername;
  }

  if (actualPassword && newPassword) {
    const validPassword = await bcryptjs.compare(
      actualPassword,
      originalUser.password
    );
    if (!validPassword) {
      return renderProfile(req, res, {
        username,
        admin,
        email: originalUser.email,
        alert: {
          showAlert: true,
          messageAlert: "La contraseña que ha ingresado es incorrecta",
          typeAlert: "danger",
        },
      });
    }
    const passwordHash = await bcryptjs.hash(newPassword, 10);
    await pool.query(`UPDATE users
    SET password = '${passwordHash}'
    WHERE username = '${username}';`);
  }

  const [newUserQuery] = await pool.query(
    `SELECT * FROM users WHERE username='${username}'`
  );
  const newUser = newUserQuery[0];

  return renderProfile(req, res, {
    username,
    admin,
    email: newUser.email,
    alert: {
      showAlert: true,
      messageAlert: "Los cambios han sido realizados exitosamente",
      typeAlert: "success",
    },
  });
};
