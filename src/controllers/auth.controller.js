import { postUsers } from "../models/users.js";
import { getUsers } from "../models/users.js";
import { postUserSession } from "../models/userSession.js";
import { deleteUserSession } from "../models/userSession.js";
import { createAccessToken } from "../middlewares/jwt.js";

export const renderRegistro = (req, res) => {
    res.render("registro", {
      invalidUser: false,
    });
  };
  
export const userRegister = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        //const passwordHash = await bcryptjs.hash(password, 10)

        const newUser = {
            username,
            password,
            email
        }

        const userSaved = JSON.stringify(newUser) + "\n";
        postUsers(userSaved)

        const token = await createAccessToken({username})

        res.cookie("token", token)

        renderLogin(req, res)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

export const renderLogin = (req, res) => {
  res.render("login", {
    invalidUser: false,
  });
};

export const verifyUser = (req, res) => {
  const { username, password } = req.body;

  const data = getUsers();

  let userValidated = data
    .split("\n")
    .filter((e) => e != "")
    .find((user) => {
      user = JSON.parse(user);
      if (user.username === username && user.password === password) {
        return user;
      }
    });

  if (userValidated) {
    postUserSession(userValidated);
    res.redirect("/registro");
  } else {
    res.render("login", {
      invalidUser: true,
    });
  }
};

export const getLogout = (req, res, next) =>{
    deleteUserSession()
    return res.redirect("/login")
}