import "dotenv/config"
import express from "express"
import cors from "cors"
import routeBuilder from "./routes";
import path from "path";

const PORT = process.env.PORT || 3000;
const app = express()

app.use(express.json())
app.use(cors())

// Mapper de rutas
routeBuilder(app)

// Servir estáticos del front
app.use(express.static(path.join(__dirname, '../../front/dist')));

// Ruta para servir el front (SPA)
app.get(/^\/(?!api).*/, (_, res) => {
    res.sendFile(path.join(__dirname, '../../front/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at: ${PORT}  ENV:  ${process.env.NODE_ENV}`)
})