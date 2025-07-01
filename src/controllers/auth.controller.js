import { createAccessToken } from "../libs/jwt.js";
import bcryptjs from "bcryptjs";
import { pool } from "../db.js";

export const renderRegister = (req, res) => {
  res.render("auth/register", {
    invalidUser: false,
    showAlert: false,
    messageAlert: "",
    typeAlert: "",
  });
};

export const userRegister = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const [repeatedUserQuery] = await pool.query(
      `SELECT * FROM users WHERE username = '${username}'`
    );
    const repeatedUser = repeatedUserQuery[0];
    if (repeatedUser) {
      return res.render("auth/register", {
        invalidUser: true,
        showAlert: true,
        messageAlert:
          "Ya existe un usuario con el mismo nombre en la base de datos",
        typeAlert: "danger",
      });
    }
    const passwordHashDb = await bcryptjs.hash(password, 10);
    await pool.query(`INSERT INTO users (username, password, email) VALUES
    ('${username}', '${passwordHashDb}', '${email}')`);
    res.redirect("/login");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const renderLogin = (req, res) => {
  res.render("auth/login", {
    invalidUser: false,
    showAlert: false,
    messageAlert: "",
    typeAlert: "",
  });
};

export const verifyUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const [userFoundQuery] = await pool.query(
      `SELECT * FROM users WHERE username="${username}"`
    );
    const userFound = userFoundQuery[0];
    if (!userFound) {
      return res.render("auth/login", {
        invalidUser: true,
        showAlert: true,
        messageAlert: "El nombre de usuario o la contraseña son incorrectos.",
        typeAlert: "danger",
      });
    }

    const validPassword = await bcryptjs.compare(password, userFound.password);
    if (!validPassword) {
      return res.render("auth/login", {
        invalidUser: true,
        showAlert: true,
        messageAlert: "El nombre de usuario o la contraseña son incorrectos.",
        typeAlert: "danger",
      });
    }

    const userApproved = userFound.role != "Por Aprobar";
    if (!userApproved) {
      return res.render("auth/login", {
        invalidUser: true,
        showAlert: true,
        messageAlert:
          "El usuario aún no ha sido aprobado por la administración.",
        typeAlert: "danger",
      });
    }

    const admin = userFound.role == "Administrador";

    const token = await createAccessToken({ username, admin });
    res.cookie("token", token);
    res.redirect("/inicio");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLogout = (req, res, next) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.redirect("/login");
};
