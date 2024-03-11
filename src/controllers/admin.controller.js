import { getUsers } from "../models/users.js";

export const getAdmin = (req, res) => {
    const {username, admin} = req.user
    if (!admin) return res.redirect("/inicio")

    const users = getUsers()

    return res.render("admin", {
        username,
        admin,
        users
    })
}

export const postAdmin= (req, res) => {
    const {user, newPassword} = req.body
    if (newPassword){
        console.log(user)
        console.log(newPassword)
    }
    getAdmin(req, res)
}