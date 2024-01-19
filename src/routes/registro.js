const {Router} = require("express")
const path = require("path")
const fs = require("fs")

const router = Router()

router.get("/registro", (req, res) => {
    res.render("registro")
})

router.post("/registro", (req, res) => {
    newVisit(req.body)
    res.render("registro")
})

const dirApp = path.normalize(__dirname + path.sep + "..")

function newVisit (data){
    const {cant_nino, cant_adult, cant_mayores, total_family, monto_dolares, monto_bolivares, metodo_pago, info_payment_method, nombre_representante, telefono_representante} = data

    let contenido = `Niños: ${cant_nino}, Adultos: ${cant_adult}, Adultos Mayores: ${cant_mayores}, Total: ${total_family}. Monto en Dólares: ${monto_dolares}, Monto en Bolívares: ${monto_bolivares}, Método de Pago: ${metodo_pago}`

    if (metodo_pago === "Efectivo"){
        contenido += `, Moneda: ${info_payment_method}`
    } else{
        contenido += `, Referencia: ${info_payment_method}`
    }
    contenido += `, Representante: ${nombre_representante}, Teléfono: ${telefono_representante}\n`

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