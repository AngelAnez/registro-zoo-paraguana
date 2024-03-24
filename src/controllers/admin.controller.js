import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const getAdmin = async (req, res, alert) => {
    const {username, admin} = req.user
    if (!admin) return res.redirect("/inicio")
    let showAlert, messageAlert, typeAlert
    if (alert){
        showAlert = alert.showAlert
        messageAlert = alert.messageAlert
        typeAlert = alert.typeAlert
    } else {
        showAlert = false
        messageAlert = ""
        typeAlert = ""
    }

    try {
        const users = await User.find()    
        return res.render("admin", {
            username,
            admin,
            users,
            showAlert,
            messageAlert,
            typeAlert
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const postAdmin = async (req, res) => {
    const {username, newPassword, changeRole, eraseUser} = req.body
    try {
        let userModified
        let message = ""
        if (newPassword) {
            const passwordHash = await bcryptjs.hash(newPassword, 10);
            userModified = await User.findOneAndUpdate({username}, {"password": passwordHash})
            message = `La contraseña del usuario ${username} ha sido cambiada exitosamente`
        }
        if (changeRole){
            userModified = await User.findOneAndUpdate({username}, {"role": changeRole})
            message = `El cambio de rol del usuario ${username} ha sido realizado exitosamente`
        }
        if (eraseUser){
            userModified = await User.deleteOne({username})
            message = `El usuario ${username} ha sido eliminado exitosamente`
        }
        const alert = {
            showAlert: true,
            messageAlert: message,
            typeAlert: "success"
        }
        getAdmin(req, res, alert)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}