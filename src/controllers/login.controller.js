import fs from "fs";
import path from "path";
import { DIR_APP } from "../global.js";

export const activeSession = (req, res, next) => {
    const data = fs.readFileSync(path.join(DIR_APP,"/data/userSession.txt"), {encoding: "utf-8"})
    if (data){
        return res.redirect("/registro")
    } else {
        next()
    }
}

export const renderLogin = (req, res) => {
    res.render("login", {
        invalidUser: false
    })
}

export const verifyUser = (req, res) => {
    const {username, password} = req.body

    const data = fs.readFileSync(path.join(DIR_APP,"/data/users.txt"), {encoding: "utf-8"})

    let userValidated = data.split("\n").filter(e => e != "").find(user => {
        user = JSON.parse(user)
        if (user.username === username && user.password === password){
            return user
        }
    })

    if (userValidated) {
        fs.writeFileSync(path.join(DIR_APP,"/data/userSession.txt"), userValidated)
        res.redirect("/registro")
    } else{
        res.render("login", {
            invalidUser: true
        })
    }

}