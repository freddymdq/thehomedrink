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
        const newProduct = {
            title, 
            description, 
            price, 
            image, 
            code,
            stock,
        }

        if(!Object.values(newProduct).includes(undefined)){
            ProductManager.id++;
            this.products.push({
                ...newProduct,
                id:ProductManager.id
            }); 
        }else{
            console.log("Todos los campos son necesarios")
        }


        let cartsById = await this.existTheCarts(idCarts)
            if(!cartsById) return "El carrito no existe"
        let prodById = await allProduct.existTheProd(idProd)
            if(!cartsById) return "El producto no existe"
        
        let allCarts = await this.readCartsFile()
        let filterCart = allCarts.filter((cart) => cart.id != idCarts);
        
            if(cartsById.products.some((prod) => prod.id === idProd)){
                let addProd = cartsById.products.find((prod) => prod.id === idProd)
                addProd.quantity++
                let newCart = [cartsById, ...filterCart]
                await this.writeCarts(newCart)
                return "Producto sumado al carrito"
            }
        cartsById.products.push({id:prodById.id, quantity: 1})
        
        let newCart = [cartsById, ...filterCart]
                await this.writeCarts(newCart)
                return "Producto agregado al carrito"
    }
}


export default CartManager