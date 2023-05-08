import { Router } from "express";
import CartManager from "../Dao/controllers/cartManager.js";
import AccesManager from "../Dao/controllers/AccesManager.js";

const router = Router();
const cartManager = new CartManager();
const accesManager = new AccesManager();

router.get('/', async (req, res) => {
    try {
        await accesManager.createRecord('GET CARTS');
    }catch(error){
        res.status(400).send({
            status: "Error",
            msg: `El total de carritos no se puede visualizar.`
        });
    }
});
router.get('/:cid', async (req, res) => {
    try{
        await accesManager.createRecord('GET CARTS BY ID');
    }catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `El carro solicitado no se pueden visualizar.`
        });
    }
});
router.post('/', async (req, res) => {
    try{
        await accesManager.createRecord('POST CART');
    }catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `El carrito solicitado no se puede visualizar.`
        });
    }
});
router.post('/:cid/product/:pid', async (req, res) => {
    try{
        await accesManager.createRecord('POST PRODUCT IN CART');
        return res.status(200).send(await cartManager.addProductToCart(idCart, idProduct));
    }catch(error) {
        res.status(400).send({
            status: "Error",
            msg: `El producto solicitado no se puede agregar en el carro indicado.`
        });
    }
});
export default router;