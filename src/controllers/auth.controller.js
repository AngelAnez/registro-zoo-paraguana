import { postUsers } from "../models/users.js";
import { getUsers } from "../models/users.js";
import { createAccessToken } from "../lib/jwt.js";
import bcryptjs from "bcryptjs";

export const renderRegistro = (req, res) => {
    res.render("registro", {
      invalidUser: false,
    });
  };
  
export const userRegister = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const passwordHash = await bcryptjs.hash(password, 10)
        const newUser = {
            username,
            password: passwordHash,
            email,
            admin: false
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
      });
    }

    const validPassword = await bcryptjs.compare(password, userFound.password)
    if (!validPassword){
      return res.render("login", {
        invalidUser: true,
      });
    }

    const token = await createAccessToken({username, admin: userFound.admin})
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