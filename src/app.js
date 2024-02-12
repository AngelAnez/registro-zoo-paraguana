import express from "express"
import path from "path"
import "ejs"
import { DIR_APP } from "./global.js"

import InicioRoutes from "./routes/inicio.routes.js"
import PerfilRoutes from "./routes/perfil.routes.js"
import RegistroRoutes from "./routes/registro.routes.js"
import HistorialRoutes from "./routes/historial.routes.js"
import EstadisticasRoutes from "./routes/estadisticas.routes.js"
import AjustesRoutes from "./routes/ajustes.routes.js"

const app = express()

app.set("port", 8040)
app.set("view engine", "ejs")
app.set("views", path.join(DIR_APP, "views"))

/* Middlewares para formateo de datos*/ 

app.use(express.json());
app.use(express.urlencoded({extended: true}));

/* Rutas del Servidor */

app.use(InicioRoutes)
app.use(PerfilRoutes)
app.use(RegistroRoutes)
app.use(HistorialRoutes)
app.use(EstadisticasRoutes)
app.use(AjustesRoutes)

/* Archivos Estáticos*/

app.use("/public", express.static(path.join(DIR_APP, "public")))

app.listen(app.get("port"))
console.log(`Server on port ${app.get("port")}`)