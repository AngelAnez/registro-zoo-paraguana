import { getUsers } from "../models/users.js";
import { postUserSession } from "../models/userSession.js";

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
