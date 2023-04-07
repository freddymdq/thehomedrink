import {Router} from "express";
import CartManager from "../controllers/CartManager.js"

const CartRouter = Router()
const carts = new CartManager()

CartRouter.post("/", async(req, res)=>{
    res.send(await carts.addCarts())
})

CartRouter.get('/', async(req, res)=>{
    res.send(await carts.readCartsFile())
})

CartRouter.get('/:id', async(req, res)=>{
    res.send(await carts.getCartsById(req.params.id))
})

CartRouter.post('/:cid/products/:pid', async (req, res) => {
    let idCarts = req.params.cid
    let idProd = req.params.pid
    res.send(await carts.addProductInCart(idCarts, idProd))
})

export default CartRouter