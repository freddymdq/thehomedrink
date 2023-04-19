import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const ViewsRouter = Router()
const product = new ProductManager()

ViewsRouter.get("/", async (req, res) => {
    let allProducts = await product.getProducts()
    res.render('home', {
        title: "The Drink Home",
        products: allProducts
    })
})

ViewsRouter.get('/realTimeProducts', async (req, res) => {
try {
    let allProducts = await product.getProducts()
    res.render('realTimeProducts', {
        title: "The Drink Home",
        allProducts})
} catch (error) {
    res.status(400).send({
    status: "Error",
    msg: `No se pueden visualizar algunos productos`
    });
}
});


export default ViewsRouter;