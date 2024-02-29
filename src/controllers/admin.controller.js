import { getUsers } from "../models/users.js";

export const getAdmin = (req, res) => {
    const {username, admin} = req.user
    if (!admin) return res.redirect("/inicio")

    const users = getUsers().split("\n").filter(e => e != "").map(user => {
        return JSON.parse(user)
    })

    return res.render("admin", {
        username,
        admin,
        users
    })
}