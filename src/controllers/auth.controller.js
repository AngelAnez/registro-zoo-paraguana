import { postUsers } from "../models/users.js";
import { getUsers } from "../models/users.js";
import { createAccessToken } from "../lib/jwt.js";
import bcryptjs from "bcryptjs";

export const renderRegistro = (req, res) => {
    res.render("registro", {
      invalidUser: false,
      message: ""
    });
  };
  
export const userRegister = async (req, res) => {
    const { username, password, email } = req.body;
    const users = getUsers()
    const uniqueUsername = users.every(user => user.username != username)
    if (!uniqueUsername){
      return res.render("registro", {
        invalidUser: true,
        message: "Ya existe un usuario con el mismo nombre"
      });
    }
    try {
        const passwordHash = await bcryptjs.hash(password, 10)
        const newUser = {
            username,
            password: passwordHash,
            email,
            role: "Por Aprobar"
        }
        postUsers(newUser)
        res.redirect("/login");
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

export const renderLogin = (req, res) => {
  res.render("login", {
    invalidUser: false,
    message: ""
  });
};

export const verifyUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const data = getUsers();

    let userFound = data.find(user => user.username === username);
    if (!userFound){
      return res.render("login", {
        invalidUser: true,
        message: "El nombre de usuario o la contraseña son incorrectos."
      });
    }

    const validPassword = await bcryptjs.compare(password, userFound.password)
    if (!validPassword){
      return res.render("login", {
        invalidUser: true,
        message: "El nombre de usuario o la contraseña son incorrectos."
      });
    }

    const userApproved = userFound.role != "Por Aprobar"
    if (!userApproved){
      return res.render("login", {
        invalidUser: true,
        message: "El usuario aún no ha sido aprobado por la administración"
      });
    }
    let admin = userFound.role == "Administrador"

    const token = await createAccessToken({username, admin})
    res.cookie("token", token)
    res.redirect("/inicio");  

  } catch (error) {
    res.status(500).json({message: error.message})
  }
  
};

export const getLogout = (req, res, next) =>{
    res.cookie("token", "", {
      expires: new Date(0)
    })
    return res.redirect("/login")
}