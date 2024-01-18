const { Router } = require("express")

const router = Router()

router.get("/ajustes", (req, res) => {
    res.render("ajustes")
})

module.exports = router