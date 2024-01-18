const { Router } = require("express")

const router = Router()

router.get("/historial", (req, res) => {
    res.render("historial")
})

module.exports = router