import express from "express";
import ProdRouter from "./router/product.routes.js";
import CartRouter from "./router/cart.routes.js";

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// enlazamos el router
app.use("/api/product", ProdRouter)
// enlazamos el cart
app.use("/api/cart", CartRouter)

// Levantamos servidor 
app.listen(PORT, () => {
    console.log(`El Servidor express funcionando correctamente en Puerto ${PORT}`)
})