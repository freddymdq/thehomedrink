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

// Borrar carrito
router.delete('/:id', async (req, res) => {
  const cartId = req.params.id;
  try {
    await accesManager.createRecord('CARRITO BORRADO');
    const result = await cartModel.deleteOne({ _id: cartId });
    if (result.deletedCount === 0) {
      res.status(404).send({ error: 'Carrito no encontrado' });
    } else {
      res.status(200).send({ message: `Carrito con ID ${cartId} eliminado exitosamente` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'No se puede eliminar el carrito' });
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
    // busca producto por ID
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).send({
        status: "Error",
        msg: "Producto no encontrado"
      });
    }
    // busca carrito por ID
    const cart = await cartModel.findById(cartId);
    if (!cart) {
      return res.status(404).send({
        status: "Error",
        msg: "Carrito no encontrado"
      });
    }
    // verifica si el producto ya esta en el carrito
    const existingProduct = cart.products.find(
      (p) => p.product.toString() === productId
    );
    // si el producto ya está en el carrito, actualizar cantidad le suma 1 a la cantidad
    if (existingProduct) {
      existingProduct.quantity += quantity;
    // si el producto no está en el carrito, lo carga con 1 en quantity
    } else {
      cart.products.push({ product: productId, quantity: quantity });
    }
    // guarda el msj de lo agregado al log.txt
    await accesManager.createRecord(`PRODUCTO CON ID: ${productId} FUE AGREGADO AL CART CON ID: ${cartId}`);
    // guarda el carrito en la base de datos con el producto agregado (cambios)
    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    res.status(400).send({
      status: "Error",
      msg: "No se puede agregar el producto al carrito"
    });
  }
});

// eliminar producto del carrito
router.delete('/:cartId/product/:productId', async (req, res) => {
  try {
    // obtiene el ID del carrito y el ID del producto a eliminar desde los parámetros de la solicitud
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    
    // si se especifica, se obtiene la cantidad del producto a eliminar de la solicitud, de lo contrario se elimina una sola unidad del producto
    const quantity = req.body.quantity || 1;
    
    // busca el carrito con el ID especificado en la base de datos
    const cart = await cartModel.findById(cartId);

    // si el carrito no existe, envía un mensaje de error al cliente
    if (!cart) {
      return res.status(404).send({
        status: "Error",
        msg: "Carrito no encontrado"
      });
    }

    // busca el índice del producto que se está eliminando en el carrito
    const existingProductIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    // si se encuentra el producto en el carrito, se reduce su cantidad o se elimina del carrito completamente
    if (existingProductIndex >= 0) {
      const existingProduct = cart.products[existingProductIndex];
      if (existingProduct.quantity > quantity) {
        existingProduct.quantity -= quantity;
      } else {
        cart.products.splice(existingProductIndex, 1);
      }
    } else {
      // si el producto no se encuentra en el carrito, envía un mensaje de error al cliente
      return res.status(404).send({
        status: "Error",
        msg: "Producto no encontrado en el carrito"
      });
    }

    // registra en el log.txt que se eliminó una unidad del producto del carrito
    await accesManager.createRecord(`SE BORRO UNA UNIDAD DEL PRODUCTO: ${productId} DEL CARRITO: ${cartId}`);
    
    // guarda el carrito actualizado en la base de datos
    await cart.save();
    
    // envía el carrito actualizado al cliente
    res.status(200).send(cart);
  } catch (error) {
    // si se produce un error, envía un mensaje de error al cliente
    res.status(400).send({
      status: "Error",
      msg: "No se puede eliminar el producto del carrito"
    });
  }
});

export default router