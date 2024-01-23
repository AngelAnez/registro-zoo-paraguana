const express = require("express")
const path = require("path")
require("ejs")

const InicioRoutes = require("./routes/inicio.js")
const PerfilRoutes = require("./routes/perfil.js")
const RegistroRoutes = require("./routes/registro.js")
const HistorialRoutes = require("./routes/historial.js")
const EstadisticasRoutes = require("./routes/estadisticas.js")
const AjustesRoutes = require("./routes/ajustes.js")

const app = express()

app.set("port", 8040)
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

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

app.use("/public", express.static(path.join(__dirname, "public")))

app.listen(app.get("port"))
console.log(`Server on port ${app.get("port")}`)