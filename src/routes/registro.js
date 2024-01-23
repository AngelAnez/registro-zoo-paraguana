const {Router} = require("express")
const path = require("path")
const fs = require("fs")

const router = Router()

router.get("/registro", (req, res) => {
    res.render("registro", {
        v: false
    })
})

router.post("/registro", (req, res) => {
    newVisit(req.body)
    res.render("registro", {
        v: true
    })
})

const dirApp = path.normalize(__dirname + path.sep + "..")

function newVisit (data){
    const {cant_nino, cant_adult, cant_mayores, total_family, monto_dolares, monto_bolivares, metodo_pago, info_payment_method, nombre_representante, telefono_representante, date, time} = data

    let contenido = {
        date,
        time,
        child: cant_nino != "" ? cant_nino : "0",
        adult: cant_adult != "" ? cant_adult : "0",
        older: cant_mayores != "" ? cant_mayores : "0",
        total: total_family,
        dolar: monto_dolares.replace("$",""),
        bolivares: monto_bolivares.replace(" Bs.",""),
        method: metodo_pago,
        infoMethod: info_payment_method,
        name: nombre_representante,
        telephone: telefono_representante
    }

    contenido = JSON.stringify(contenido)
    contenido += "\n"
    fs.writeFile(path.join(dirApp, "/data/visitas.txt"), contenido,{flag: "a"}, (err) => {
        if (err){
            console.log(err)
        }
        else {
            console.log("El visitante fue añadido exitosamente")
      }
    })
}

module.exports = router