import express from "express"
import path from "path"
import "ejs"
import CookieParser from "cookie-parser";
import { DIR_APP } from "./global.js"
import { pool } from "./db.js";

import AuthRoutes from "./routes/auth.routes.js";
import AdminRoutes from "./routes/admin.routes.js";
import InicioRoutes from "./routes/inicio.routes.js"
import PerfilRoutes from "./routes/perfil.routes.js"
import VisitantesRoutes from "./routes/visitantes.routes.js"
import HistorialRoutes from "./routes/historial.routes.js"
import EstadisticasRoutes from "./routes/estadisticas.routes.js"
import NovedadesRoutes from "./routes/novedades.routes.js"
import AjustesRoutes from "./routes/ajustes.routes.js"
import ReporteRoutes from "./routes/reporte.routes.js";

const app = express()

app.set("port", 8040)
app.set("view engine", "ejs")
app.set("views", path.join(DIR_APP, "views"))

/* Middlewares para formateo de datos*/ 

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(CookieParser())

/* Rutas del Servidor */

app.get("/ping", async (req, res) => {
    try {
        const [result] = await pool.query(`INSERT INTO news (subject, body, author, date, time) VALUES (
            "Novedad de Prueba", "Este mensaje solo sirve para probar si la novedad se guarda exitosamente", "AngelDavid", "2024-4-12", "6:51 PM"
        )`)
        res.json(result)
    } catch (error) {
        res.status(404).json(error.message)
    }
})

app.use(AuthRoutes)
app.use(AdminRoutes)
app.use(InicioRoutes)
app.use(PerfilRoutes)
app.use(VisitantesRoutes)
app.use(HistorialRoutes)
app.use(EstadisticasRoutes)
app.use(NovedadesRoutes)
app.use(AjustesRoutes)
app.use(ReporteRoutes)

/* Archivos Estáticos*/

app.use("/public", express.static(path.join(DIR_APP, "public")))
app.use((req, res, next) => {
    res.redirect("/login")
})

app.listen(app.get("port"))
console.log(`Server on port ${app.get("port")}`)