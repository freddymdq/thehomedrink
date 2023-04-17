import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io"
import * as path from "path";
import __dirname from "./utils.js";
import ProdRouter from "./router/product.routes.js";
import CartRouter from "./router/cart.routes.js";
import ViewsRouter from "./router/views.routes.js";


const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// estructura handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

// archivos estaticos
app.use("/", express.static(__dirname + "/public"))

// Hb - Traemos todos productos
app.use("/", ViewsRouter)
// Hb - por id.
app.use("/id", ViewsRouter)



// enlazamos el router
app.use("/api/product", ProdRouter)
// enlazamos el cart
app.use("/api/cart", CartRouter)

// Levantamos servidor 
const serv = app.listen(PORT, () => {
    console.log(`El Servidor express funcionando correctamente en Puerto ${PORT}`)
})


const socketServer = new Server(serv);

socketServer.on('connection', socket => {
    console.log('Usuario conectado')

    socket.on("message", data => {
        socketServer.emit('log', data)
    })

})