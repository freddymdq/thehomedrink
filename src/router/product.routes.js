import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";
import AccesManager from "../controllers/AccesManager.js";

const router = Router();
const productManager = new ProductManager();
const accesManager = new AccesManager()

router.get('/', async (req, res)=>{
    try{
        const products = await productManager.getProductsaccesManager.createRecord('GET PRODUCTS');
        const limit = parseInt(req.query.limit);
        if (limit){
            const productNumber = products.slice(0, limit);
            return res.status(200).send(productNumber);
        }else{
            return res.status(200).send(products);
        }
    }catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `Los productos solicitados no se pueden visualizar.`
        });
    }
});
router.get('/:pid', async (req, res)=>{
    try{
        await accesManager.createRecord('GET PRODUCT BY ID');
        const pid = req.params.pid;
        res.status(200).send(await productManager.getProductById(pid));
    }catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `El producto con ID: ${pid} no existe o no se pudo encontrar.`
        });
    }
});
router.post('/' , async (req, res)=>{
    try{
        await accesManager.createRecord('POST PRODUCTS');
        const { title, description, price, img, code, stock } = req.body;
        return res.status(200).send(await productManager.addProduct({ title, description, price, thumbnail, code, stock }));
    }catch (error){
        res.status(400).send({
            status: "Error",
            msg: error.message
        });
    }
});
router.delete('/:pid', async (req, res) => {
    try {
        await accesManager.createRecord('DELETE PRODUCT');
        const pid = req.params.pid;
        const product = await productManager.getProductById(pid);
        if (product.length === 0) {
            return res.status(400).send({
            status: "Error",
            msg: `El producto con ID: ${pid} no existe o no se pudo encontrar.`
        });
    }
    return res.status(200).send(await productManager.deleteProduct(pid));
    } catch (error) {
    res.status(400).send({
        status: "Error",
        msg: `El producto con ID: ${pid} no se ha podido eliminar.`
    });
    }
});
router.put('/:pid', async (req, res)=>{
    try{
        await accesManager.createRecord('PUT');
        const pid = req.params.pid;
        const updates = req.body;
        res.status(200).send(await productManager.updateProduct(pid, updates));
    }catch (error){
        res.status(400).send({
            status: "Error",
            msg: `El producto con ID: ${pid} no se ha podido actualizar.`
        });
    }
});
export default router;