import { promises as fs } from 'fs';
import { nanoid } from 'nanoid';
import ProductManager from './ProductManager.js'

const allProduct = new ProductManager()

class CartManager {
    constructor() {
        this.path = "./src/models/carts.json";
    }

    readCartsFile = async () => {
        let carts = await fs.readFile(this.path, "utf-8")
            return JSON.parse(carts)
    }

    writeCarts = async (carts) => {
            await fs.writeFile(this.path, JSON.stringify(carts))
    }

    // agregamo el carrito
    addCarts = async () => {
        const oldCart = await this.readCartsFile()
        const id = nanoid()
        const newCart = { id: id, products: [] }
        const updatedCarts = [newCart, ...oldCart]
            await this.writeCarts(updatedCarts)
            return "El carrito ha sido agregado exitosamente."
    }

    // verificamos si el carrito exite
    existTheCarts = async (id) => {
        let carts = await this.readCartsFile()
            return carts.find(cart => cart.id === id)
    }

    // buscamos el carrito por id
    getCartsById = async(id) => {
        let cartsById = await this.existTheCarts(id)
            if(!cartsById) return "El carrito no existe"
            return cartsById
    }

    // Agregamos los productos al carrito
    addProductInCart = async (idCart, idProd) => {
        const cart = await this.existTheCarts(idCart)
            if (!cart) return "El carrito no existe"
    
        const product = await allProduct.existTheProd(idProd)
            if (!product) return "El producto no existe"
    
        const allCarts = await this.readCartsFile()
        const filterCarts = allCarts.filter(cart => cart.id !== idCart)
    
        const existProdIndex = cart.products.findIndex(prod => prod.id === idProd);
            if (existProdIndex !== -1) {
                cart.products[existProdIndex].quantity++
            } else {
            const prodTitle = (await allProduct.readProductsFile()).find(prod => prod.id === idProd)?.title;
                cart.products.push({id: idProd, quantity: 1, title: prodTitle})
        }
    
            await this.writeCarts([cart, ...filterCarts])
            return existProdIndex !== -1 ? "Producto sumado al carrito" : "Producto agregado al carrito"
    }
}


export default CartManager