import express from "express"
import ProductManager from "./components/ProductManager.js"

const app = express() 
const products = new ProductManager()
const readPro = products.readFileProducts()
const PORT = 8080;
const serv = app.listen(PORT, ( ) =>{
    console.log(`Local Host esta funcionando correctamente puerto N°${serv.address().port}`)
})

// le permitimos al servidor express que lea sin limite de endpoint para que no de conflicto.
app.use(express.urlencoded({extended: true}))
        // ruta    // require response 
app.get("/products", async (require, response) => {
    let limite = parseInt(require.query.limite);
    if (!limite) return response.send(await readPro)
    let allProd = await readPro
                            // inicia en 0 y termina en el limite   
    let limitProd = allProd.slice(0, limite)
    response.send(limitProd);
});

app.get("/products/:id", async (req, res) => {
    let id = parseInt(req.params.id)
    let allProd = await readPro
    let productById = allProd.find(product => product.id === id)
    res.send(productById)
    
})

// Iniciamos nuesto servidor si encuentra un error muestra por consola.
serv.on("Error", (error) => console.log(`Error del servidor ${error}`))
