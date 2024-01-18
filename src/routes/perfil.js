const { Router } = require("express")

const router = Router()

router.get("/perfil", (req, res) => {
    res.render("perfil")
})

module.exports = router