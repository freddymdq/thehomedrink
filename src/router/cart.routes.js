import { Router } from "express";
import CartManager from "../controllers/CartManager.js";
import AccesManager from "../controllers/AccesManager.js";

const router = Router();
const cartManager = new CartManager();
const accesManager = new AccesManager();

router.get('/', async (req, res) => {
    try {
        await accesManager.createRecord('GET CARTS');
        return res.status(200).send(await cartManager.getCarts());
    }catch(error){
        res.status(400).send({
            status: "Error",
            msg: `No se puede mostrar el total de los carritos`
        });
    }
});
router.get('/:cid', async (req, res) => {
    try{
        await accesManager.createRecord('GET CARTS BY ID');
        const cid = req.params.cid;
        return res.status(200).send(await cartManager.getCartById(cid));
    }catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `El carro seleccionado no se puede mostrar`
        });
    }
});
router.post('/', async (req, res) => {
    try{
        await accesManager.createRecord('POST CART');
        return res.status(200).send(await cartManager.addCart());
    }catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `El carro solicitado no se puede ver`
        });
    }
});
router.post('/:cid/product/:pid', async (req, res) => {
    try{
        await accesManager.createRecord('POST PRODUCT IN CART');
        const idCart = req.params.cid;
        const idProduct = req.params.pid;
        return res.status(200).send(await cartManager.addProductToCart(idCart, idProduct));
    }catch(error) {
        res.status(400).send({
            status: "Error",
            msg: `El producto solicitado no se puede agregar en el carro indicado.`
        });
    }
});
export default router;
