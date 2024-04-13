import bcryptjs from "bcryptjs";
import { pool } from "../db.js";

export const getAdmin = async (req, res, alert) => {
    const {username, admin} = req.user
    let pag = 1
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
        let query = `SELECT * FROM users WHERE username <> '${username}'`
        const totalQuery = await pool.query(`${query.replace("*", "COUNT(*)")}`)
        const total = Object.values(totalQuery[0][0])[0]
        query+= ` LIMIT 8`
        if (req.query.pag) {
            pag = parseInt(req.query.pag);
            if (pag > 1){
              query+= ` OFFSET ${8*(pag-1)}`
            }
          }
        
        

        const usersQuery = await pool.query(query)
        const users = usersQuery[0]

        return res.render("admin", {
            username,
            admin,
            users,
            pag,
            total,
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
        let updateUserQuery
        let message = ""
        if (newPassword) {
            const passwordHash = await bcryptjs.hash(newPassword, 10);
            updateUserQuery = await pool.query(`UPDATE users SET password = '${passwordHash}' WHERE username = '${username}'`)
            message = `La contraseña del usuario ${username} ha sido cambiada exitosamente`
        }
        if (changeRole){
            updateUserQuery = await pool.query(`UPDATE users SET ROLE = '${changeRole}' WHERE username = '${username}'`)
            message = `El cambio de rol del usuario ${username} ha sido realizado exitosamente`
        }
        if (eraseUser){
            updateUserQuery = await pool.query(`DELETE FROM users WHERE username = '${username}'`)
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