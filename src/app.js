import express from "express";
import path from "path";
import "ejs";
import CookieParser from "cookie-parser";
import { DIR_APP } from "./global.js";
import { pool } from "./db.js";
import fs from "fs";

import AuthRoutes from "./routes/auth.routes.js";
import AdminRoutes from "./routes/admin.routes.js";
import HomeRoutes from "./routes/home.routes.js";
import PerfilRoutes from "./routes/perfil.routes.js";
import VisitsRoutes from "./routes/visits.routes.js";
import HistoryRoutes from "./routes/history.routes.js";
import EstadisticasRoutes from "./routes/estadisticas.routes.js";
import NovedadesRoutes from "./routes/novedades.routes.js";
import AjustesRoutes from "./routes/ajustes.routes.js";
import ReporteRoutes from "./routes/reporte.routes.js";

const app = express();

app.set("port", 8040);
app.set("view engine", "ejs");
app.set("views", path.join(DIR_APP, "views"));

/* Middlewares para formateo de datos*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(CookieParser());

/* Rutas del Servidor */

app.get("/seed", async (_, res) => {
  try {
    const seedData = fs.readFileSync("./src/db/seed.sql", "utf8");
    await pool.query(seedData);
    res.send("Proceso de seeding completado exitosamente");
  } catch (error) {
    console.log(error);
    res.status(404).json(error.message);
  }
});

app.use(AuthRoutes);
app.use(AdminRoutes);
app.use(HomeRoutes);
app.use(PerfilRoutes);
app.use(VisitsRoutes);
app.use(HistoryRoutes);
app.use(EstadisticasRoutes);
app.use(NovedadesRoutes);
app.use(AjustesRoutes);
app.use(ReporteRoutes);

/* Archivos Estáticos*/

app.use("/public", express.static(path.join(DIR_APP, "public")));
app.use((req, res, next) => {
  res.redirect("/login");
});

app.listen(app.get("port"));
console.log(`Server on port ${app.get("port")}`);
