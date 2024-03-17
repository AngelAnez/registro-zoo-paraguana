import { getUsers, modifyUser, deleteUser } from "../models/users.js";

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

export const postAdmin = (req, res) => {
    const {username, newPassword, promoteUser, eraseUser} = req.body
    let users = getUsers()
    const userPosition = users.findIndex(user => user.username == username)
    if (userPosition == -1){
        return getAdmin(req, res)
    }
    if (newPassword){
        modifyUser(userPosition, "password", newPassword)
    }
    if (promoteUser){
        modifyUser(userPosition, "admin", promoteUser)
    }
    if (eraseUser){
        deleteUser(username)
    }
    getAdmin(req, res)
}