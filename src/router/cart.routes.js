import { Router } from "express";
import AccesManager from "../Dao/controllers/AccesManager.js";
import cartModel from "../Dao/models/cart.model.js";
import ProductModel from "../Dao/models/products.model.js";

const accesManager = new AccesManager();
const router = Router();

// Crea cart
router.post('/', async (req, res)=>{
    try {
        await accesManager.createRecord('CART CREATE');
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
    await accesManager.createRecord('GET ALL CARTS');
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
    await accesManager.createRecord(`GET CART BY ID: ${req.params.id}`);
    const cart = await cartModel.findById(req.params.id);
    res.status(200).send(cart);
  } catch (error) {
    res.status(400).send({
      status: "Error",
      msg: "No se puede obtener el carrito"
    });
  }
});




// Delete a cart
router.delete('/:id', async (req, res)=>{
    try {
        await accesManager.createRecord('CART DELETE');
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

    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    res.status(400).send({
      status: "Error",
      msg: "No se puede agregar el producto al carrito"
    });
  }
});

// elimina un producto del carrito si hhay mas de 1 elimina en cantidad
router.delete('/:cartId/product/:productId', async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const productId = req.params.productId;

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

    if (!existingProduct) {
      return res.status(404).send({
        status: "Error",
        msg: "Producto no encontrado en el carrito"
      });
    }

    if (existingProduct.quantity > 1) {
      existingProduct.quantity -= 1;
    } else {
      cart.products = cart.products.filter(
        (p) => p.product.toString() !== productId
      );
    }

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

