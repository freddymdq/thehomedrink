import {promises as fs} from 'fs';
import { nanoid } from 'nanoid';

class ProductManager{
    constructor(){
        this.path = "./src/models/products.json"
    }

    // lee el json
    readProductsFile = async () => {
        let products = await fs.readFile(this.path, "utf-8")
            return JSON.parse(products)
    }

    // escribe en el json
    writeProducts = async (product) => {
            await fs.writeFile(this.path, JSON.stringify(product))
    }

    // existe el producto ?
    existTheProd = async (id) => {
        let products = await this.readProductsFile()
            return products.find(product => product.id === id)
    }

    // agrega producto
    addProducts = async (product) => {
        const oldProducts = await this.readProductsFile()
        const duplicate = oldProducts.some((p) => p.title === product.title && p.code === product.code&& p.id !== product.id)
            if (duplicate) {
                return('Producto duplicado')
            }
        const requiredFields = ['title', 'description', 'price','stock', 'category', 'img', 'code' ]
        const hasAllFields = requiredFields.every((field) => product[field])
            if (!hasAllFields) {
                return('Faltan campos')
        }
        product.id = nanoid();
        const allProducts = [...oldProducts, product]
            console.log('Nuevos productos:', allProducts)
            await this.writeProducts(allProducts)
                return 'Producto Agregado'
      }
   
    getProducts = async() => {
            return await this.readProductsFile()
    }

    // busca el producto por id
    getProductsById = async(id) => {
        const prodById = await this.existTheProd(id)
            if(!prodById) return "El id del producto no existe"
            return prodById
    }

    // borra el producto por id
    deleteProd = async (id) => {
        const products = await this.readProductsFile()
        const index = products.findIndex((product) => product.id === id) 
            if (index === -1) {
                return "El producto que desea eliminar no existe"
            }
        const deletedProduct = products.splice(index, 1)[0]
            await this.writeProducts(products)
                return `El producto "${deletedProduct.title}" se eliminó correctamente.`
      };

    // actualiza los campos del producto segun su id
    updateProducts = async (id, product) => {
        const existProduct = await this.existTheProd(id)
            if (!existProduct) {
                return "El producto no existe"
        }
        const updatedProduct = { ...product, id }
        const products = await this.readProductsFile()
        const index = products.findIndex((p) => p.id === id)
        products.splice(index, 1, updatedProduct)
            await this.writeProducts(products)
                return "Producto actualizado correctamente"
      };
}

export default ProductManager