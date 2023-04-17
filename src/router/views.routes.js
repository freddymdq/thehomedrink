import { Router } from 'express'
import ProductManager from '../controllers/ProductManager.js'

const ViewsRouter = Router()
const product = new ProductManager

ViewsRouter.get("/", async (req, res) => {
    let allProducts = await product.getProducts()
    res.render("home", {
        title: "The Drink Home",
        products: allProducts
    })
})

// traemos por id
ViewsRouter.get("/:id", async (req, res) => {
    let prod = await product.getProductsById(req.params.id)
    res.render("prod", {
        title: "The Drink Home",
        product: prod
    })
})

/* // eliminamos por id
ViewsRouter.delete("/:id", async (req, res) =>{
    const id = req.params.id
    try {
        const deletedProduct = await product.deleteProd(id)
        res.send(deletedProduct)
    } catch (error) {
        res.status(500).send({ error: "Internal server error" })
    }
}) */



export default ViewsRouter