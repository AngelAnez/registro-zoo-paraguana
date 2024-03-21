import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

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
}

export const postAdmin = async (req, res) => {
    const {username, newPassword, changeRole, eraseUser} = req.body
    try {
        let userModified
        if (newPassword) {
            const passwordHash = await bcryptjs.hash(newPassword, 10);
            userModified = await User.findOneAndUpdate({username}, {"password": passwordHash})
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
}