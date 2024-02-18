import { getUserSession } from "../models/userSession.js";

export const renderAjustes = (req, res) => {
  const user = getUserSession();
  res.render("ajustes", {
    username: user.username,
  });
};
