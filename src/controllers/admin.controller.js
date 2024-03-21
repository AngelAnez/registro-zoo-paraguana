import { getUsers, modifyUser, deleteUser } from "../models/users.js";
import User from "../models/user.model.js";

export const getAdmin = async (req, res) => {
    const {username, admin} = req.user
    if (!admin) return res.redirect("/inicio")

    try {
        const users = await User.find()    
        return res.render("admin", {
            username,
            admin,
            users
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

/*     const users = getUsers()

    return res.render("admin", {
        username,
        admin,
        users
    }) */
}

export const postAdmin = async (req, res) => {
    const {username, newPassword, changeRole, eraseUser} = req.body
    try {
        let userModified
        if (newPassword) {
            userModified = await User.findOneAndUpdate({username}, {"password": newPassword})
        }
        if (changeRole){
            userModified = await User.findOneAndUpdate({username}, {"role": changeRole})
        }
        if (eraseUser){
            userModified = await User.deleteOne({username})
        }
        getAdmin(req, res)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    

    /* let users = getUsers()
    const userPosition = users.findIndex(user => user.username == username)
    if (userPosition == -1){
        return getAdmin(req, res)
    }
    if (newPassword){
        modifyUser(userPosition, "password", newPassword)
    }
    if (changeRole){
        modifyUser(userPosition, "role", changeRole)
    }
    if (eraseUser){
        deleteUser(username)
    }
    getAdmin(req, res) */
}