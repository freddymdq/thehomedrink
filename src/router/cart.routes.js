import {Router} from "express";
import CartManager from "../controllers/CartManager.js"

const CartRouter = Router()
const cart = new CartManager()

CartRouter.post("/", async(req, res)=>{
    try {
        const result = await cart.addCarts()
        res.send(result)
    } catch (error) {
        res.status(500).send({ error: "Error Interno" });
    }
})

CartRouter.get('/', async(req, res)=>{
    try {
        const result = await cart.readCartsFile();
        res.send(result)
    } catch (error) {
        res.status(500).send({ error: "Error Interno" })
    }
})

CartRouter.get('/:id', async(req, res)=>{
    try {
        const result = await cart.getCartsById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500).send({ error: "Error Interno" })
    }
})

CartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const idCart = req.params.cid
        const idProd = req.params.pid
        const result = await cart.addProductInCart(idCart, idProd)
        res.send(result) 
    } catch (error) {
        res.status(500).send({ error: "Error Interno" })
    }
})

export default CartRouter;

