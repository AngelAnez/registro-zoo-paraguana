const { Router } = require("express")
const {bcvDolar} = require("bcv-divisas")

const router = Router()

router.get("/inicio", (req, res) => {
    res.render("inicio")
})

router.get("/dolar", async (req, res) => {
    // Consulta a la BDD
    const customDolar = false
    if (!customDolar){
        try {
            const bcv = await bcvDolar()
            return res.send(bcv._dolar)
        } catch (error) {
            console.log("Ha ocurrido un error de conexión")
        }
    }
    // Consulta a la BDD
    const defaultDolar = "12"
    res.send(defaultDolar)
})

module.exports = router