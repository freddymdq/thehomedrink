import { Router } from "express";
import AccesManager from "../Dao/controllers/AccesManager.js";
import cartModel from "../Dao/models/cart.model.js";
import ProductModel from "../Dao/models/products.model.js";

const accesManager = new AccesManager();
const router = Router();

// Crea cart
router.post('/', async (req, res)=>{
    try {
        await accesManager.createRecord('CARRITO CREADO');
        const cart = await cartModel.create({products: []});
        res.status(200).send(cart);
    } catch (error) {
        res.status(400).send({
            status: "Error",
            msg: "No se puede crear el carrito"
        });
    }
});

// muestra los carts
router.get('/', async (req, res) => {
  try {
    await accesManager.createRecord('TODOS LOS CARRITOS');
    const carts = await cartModel.find();
    res.status(200).send(carts);
  } catch (error) {
    res.status(400).send({
      status: "Error",
      msg: "No se pueden obtener los carritos"
    });
  }
});

// muestra un carrito por su ID
router.get('/:id', async (req, res) => {
  try {
    await accesManager.createRecord(`ID DEL CARRITO: ${req.params.id}`);
    const cart = await cartModel.findById(req.params.id);
    res.status(200).send(cart);
  } catch (error) {
    res.status(400).send({
      status: "Error",
      msg: "No se puede obtener el carrito"
    });
  }
});

// borrar carrito
router.delete('/:id', async (req, res)=>{
    try {
        await accesManager.createRecord('CARRITO BORRADO');
        const id = req.params.id;
        const result = await cartModel.deleteOne({_id: id});
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send({
            status: "Error",
            msg: "No se puede eliminar el carrito"
        });
    }
});

//agrega al carrito

router.post('/:cartId/product/:productId', async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    const quantity = req.body.quantity || 1;
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).send({
        status: "Error",
        msg: "Producto no encontrado"
      });
    }
    
    const cart = await cartModel.findById(cartId);
    if (!cart) {
      return res.status(404).send({
        status: "Error",
        msg: "Carrito no encontrado"
      });
    }

    const existingProduct = cart.products.find(
      (p) => p.product.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity: quantity });
    }

    await accesManager.createRecord(`PRODUCTO CON ID: ${productId} FUE AGREGADO AL CART CON ID: ${cartId}`);
    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    res.status(400).send({
      status: "Error",
      msg: "No se puede agregar el producto al carrito"
    });
  }
});

// Eliminar producto del carrito
router.delete('/:cartId/product/:productId', async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    const quantity = req.body.quantity || 1;
    const cart = await cartModel.findById(cartId);

    if (!cart) {
      return res.status(404).send({
        status: "Error",
        msg: "Carrito no encontrado"
      });
    }

    const existingProductIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    if (existingProductIndex >= 0) {
      const existingProduct = cart.products[existingProductIndex];
      if (existingProduct.quantity > quantity) {
        existingProduct.quantity -= quantity;
      } else {
        cart.products.splice(existingProductIndex, 1);
      }
    } else {
      return res.status(404).send({
        status: "Error",
        msg: "Producto no encontrado en el carrito"
      });
    }

    await accesManager.createRecord(`SE BORRO UNA UNIDAD DEL PRODUCTO: ${productId} DEL CARRITO: ${cartId}`);
    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    res.status(400).send({
      status: "Error",
      msg: "No se puede eliminar el producto del carrito"
    });
  }
});

export default router;

