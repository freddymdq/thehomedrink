import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const ProductRouter = Router()
const product = new ProductManager()

ProductRouter.get('/', async (req, res)=>{
    try{
        const products = await product.getProducts()
        const limit = parseInt(req.query.limit)
        if (limit){
            const productNumber = products.slice(0, limit)
            return res.status(200).send(productNumber)
        }else{
            return res.status(200).send(products)
        }
    }catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `No se pueden visualizar los productos.`
        });
    }
});
ProductRouter.get('/:pid', async (req, res)=>{
    try{
        const pid = req.params.pid
        res.status(200).send(await product.getProductById(pid))
    }catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `El producto con ID: ${pid} no existe`
        });
    }
});
ProductRouter.post('/' , async (req, res)=>{
    try{
        const { title, description, price, img, code, stock } = req.body
        return res.status(200).send(await product.addProduct({ title, description, price, img, code, stock }))
    }catch (error){
        res.status(400).send({
            status: "Error",
            msg: error.message
        });
    }
});
ProductRouter.delete('/:pid', async (req, res) => {
    try {
    const pid = req.params.pid
    const product = await product.getProductById(pid);
    if (product.length === 0) {
        return res.status(400).send({
        status: "Error",
        msg: `El producto con ID: ${pid} no se puede encontrar.`
        });
    }
    return res.status(200).send(await product.deleteProduct(pid));
    } catch (error) {
    res.status(400).send({
        status: "Error",
        msg: `El producto con ID: ${pid} no se puede eliminar.`
    });
    }
});
ProductRouter.put('/:pid', async (req, res)=>{
    try{
        const pid = req.params.pid
        const updates = req.body
        res.status(200).send(await product.updateProduct(pid, updates))
    }catch (error){
        res.status(400).send({
            status: "Error",
            msg: `El producto con ID: ${pid} no se puede actualizar.`
        });
    }
});
export default ProductRouter;
