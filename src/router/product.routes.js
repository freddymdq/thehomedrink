import {Router} from "express";
import ProductManager from "../controllers/ProductManager.js"

const ProdRouter = Router() 
const product = new ProductManager()


// consultamos todos los productos
ProdRouter.get("/", async (req, res) => {
    try {
        const products = await product.getProducts()
        res.send(products)
    } catch (error) {
        res.status(500).send({ error: "Internal server error" })
    }
})

// consultamos por id
ProdRouter.get("/:id", async (req, res) => {
    const id = req.params.id
    try {
        const productById = await product.getProductsById(id)
        res.send(productById)
    } catch (error) {
        res.status(500).send({ error: "Internal server error" })
    }
})

// updapeamos el producto
ProdRouter.put("/:id", async (req,res) => {
    const id = req.params.id
    const updateProd = req.body
    try {
        const updatedProduct = await product.updateProducts(id, updateProd)
        res.send(updatedProduct)
    } catch (error) {
        res.status(500).send({ error: "Internal server error" })
    }
})

// eliminamos productos
ProdRouter.delete("/:id", async (req, res) =>{
    const id = req.params.id
    try {
        const deletedProduct = await product.deleteProd(id)
        res.send(deletedProduct)
    } catch (error) {
        res.status(500).send({ error: "Internal server error" })
    }
})

// Agregamos producto
ProdRouter.post("/", async (req, res) => {
     const newProd = req.body
     try {
         const addedProduct = await product.addProducts(newProd)
         res.send(addedProduct)
     } catch (error) {
         res.status(500).send({ error: "Internal server error" })
     }
})

export default ProdRouter;
