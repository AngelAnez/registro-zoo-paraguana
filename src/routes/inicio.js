const { Router } = require("express")
const {bcvDolar} = require("bcv-divisas")

const router = Router()

router.get("/inicio", (req, res) => {
    res.render("inicio")
})

router.get("/dolar", async (req, res) => {
    const bcv = await bcvDolar()
    res.send(bcv._dolar)
})

module.exports = router