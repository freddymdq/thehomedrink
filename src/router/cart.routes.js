import { Router } from "express";
import CartManager from "../controllers/cartManager.js";

const CartRouter = Router()
const cartManager = new CartManager()

CartRouter.get('/', async (req, res) => {
    try {
        return res.status(200).send(await cartManager.getCarts());
    }catch(error){
        res.status(400).send({
            status: "Error",
            msg: `El total de carro no se puede ver`
        });
    }
});
CartRouter.get('/:cid', async (req, res) => {
    try{
        const cid = req.params.cid;
        return res.status(200).send(await cartManager.getCartById(cid));
    }catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `El carro por con id ${cid} no se puede ver`
        });
    }
});
CartRouter.post('/', async (req, res) => {
    try{
        return res.status(200).send(await cartManager.addCart());
    }catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `Elcarro no se puede visualizar`
        });
    }
});
CartRouter.post('/:cid/product/:pid', async (req, res) => {
    try{
        const idCart = req.params.cid
        const idProduct = req.params.pid
        return res.status(200).send(await cartManager.addProductToCart(idCart, idProduct));
    }catch(error) {
        res.status(400).send({
            status: "Error",
            msg: `El producto solicitado no se puede agregar en el carro`
        })
    }
})
export default CartRouter;

