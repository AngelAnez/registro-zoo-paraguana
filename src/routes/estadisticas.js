const { Router } = require("express")

const router = Router()

router.get("/estadisticas", (req, res) => {
    res.render("estadisticas")
})

module.exports = router