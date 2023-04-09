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
        let oldCart = await this.readCartsFile()
        let id = nanoid()
        let prodCart = [{id : id, products: []}, ...oldCart]
            await this.writeCarts(prodCart)
            return "Carrito Añadido"
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
    addProductInCart = async (idCarts, idProd) => {
        const cart = await this.existTheCarts(idCarts);
        if (!cart) return "El carrito no existe";
    
        const product = await allProduct.existTheProd(idProd);
        if (!product) return "El producto no existe";
    
        const allCarts = await this.readCartsFile();
        const filterCarts = allCarts.filter(cart => cart.id !== idCarts);
    
        const existProdIndex = cart.products.findIndex(prod => prod.id === idProd);
        if (existProdIndex !== -1) {
            cart.products[existProdIndex].quantity++;
        } else {
            const prodTitle = (await allProduct.readProductsFile()).find(prod => prod.id === idProd)?.title;
            cart.products.push({id: idProd, quantity: 1, title: prodTitle});
        }
    
        await this.writeCarts([cart, ...filterCarts]);
        return existProdIndex !== -1 ? "Producto sumado al carrito" : "Producto agregado al carrito";
    }

    /* addProductInCart = async (idCarts, idProd) => {
        let cartsById = await this.existTheCarts(idCarts);
            if (!cartsById) return "El carrito no existe";
      
        let prodById = await allProduct.existTheProd(idProd);
            if (!prodById) return "El producto no existe";
      
        let allProducts = await allProduct.readProductsFile();
        let prodTitle = allProducts.find((product) => product.id === idProd)?.title;
      
        let allCarts = await this.readCartsFile();
        let filterCart = allCarts.filter((cart) => cart.id != idCarts);
      
        if (cartsById.products.some((prod) => prod.id === idProd)) {
          let addProd = cartsById.products.find((prod) => prod.id === idProd);
          addProd.quantity++;
          let newCart = [cartsById, ...filterCart];
          await this.writeCarts(newCart);
          return "Producto sumado al carrito";
        }
        cartsById.products.push({ id: prodById.id, quantity: 1, title: prodTitle });
      
        let newCart = [cartsById, ...filterCart];
        await this.writeCarts(newCart);
        return "Producto agregado al carrito";
      } */
}


export default CartManager