import {Router} from "express";
import ProductManager from "../controllers/ProductManager.js"

const ProdRouter = Router() 
const product = new ProductManager()


// consultamos todos los productos
ProdRouter.get("/", async (req, res) => {
    res.send(await product.getProducts())
    
})

// consultamos por id
ProdRouter.get("/:id", async (req, res) => {
    let id = req.params.id
    res.send(await product.getProductsById(id))
})

// updapeamos el producto
ProdRouter.put("/:id", async (req,res) => {
    let id = req.params.id
    let updateProd = req.body 
    res.send(await product.updateProducts(id, updateProd))


})

// eliminamos productos
ProdRouter.delete("/:id", async (req, res) =>{
    let id = req.params.id
    res.send(await product.deleteProd(id))
})

// Agregamos producto
ProdRouter.post("/", async (req, res) => {
     let newProd = req.body
     res.send(await product.addProducts(newProd))
})

export default ProdRouter