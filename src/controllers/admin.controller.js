import bcryptjs from "bcryptjs";
import { pool } from "../db.js";
import { DEFAULT_ALERT } from "../libs/default-alert.js";

const renderAdmin = async (req, res, { alert = DEFAULT_ALERT, pag = 1 }) => {
  const { username, admin } = req.user;

  try {
    let query = `SELECT * FROM users WHERE username <> '${username}'`;
    const totalQuery = await pool.query(`${query.replace("*", "COUNT(*)")}`);
    const total = Object.values(totalQuery[0][0])[0];
    query += ` LIMIT 8`;
    if (pag > 1) {
      query += ` OFFSET ${8 * (pag - 1)}`;
    }

    const usersQuery = await pool.query(query);
    const users = usersQuery[0];
    return res.render("app/modules/admin/admin", {
      username,
      admin,
      users,
      pag,
      total,
      ...alert,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAdmin = async (req, res) => {
  const { admin } = req.user;
  if (!admin) return res.redirect("/home");
  let pag = !isNaN(req.query.pag) ? parseInt(req.query.pag) : 1;

  return renderAdmin(req, res, { pag });
};

export const postAdmin = async (req, res) => {
  const { username, newPassword, changeRole, eraseUser } = req.body;
  try {
    let updateUserQuery;
    let message = "";
    if (newPassword) {
      const passwordHash = await bcryptjs.hash(newPassword, 10);
      updateUserQuery = await pool.query(
        `UPDATE users SET password = '${passwordHash}' WHERE username = '${username}'`
      );
      message = `La contraseña del usuario ${username} ha sido cambiada exitosamente`;
    }
    if (changeRole) {
      updateUserQuery = await pool.query(
        `UPDATE users SET ROLE = '${changeRole}' WHERE username = '${username}'`
      );
      message = `El cambio de rol del usuario ${username} ha sido realizado exitosamente`;
    }
    if (eraseUser) {
      updateUserQuery = await pool.query(
        `DELETE FROM users WHERE username = '${username}'`
      );
      message = `El usuario ${username} ha sido eliminado exitosamente`;
    }
    const alert = {
      showAlert: true,
      messageAlert: message,
      typeAlert: "success",
    };
    return renderAdmin(req, res, { alert });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
