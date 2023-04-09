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
        const oldProducts = await this.readProductsFile();
        const isDuplicate = oldProducts.some((p) => p.title === product.title && p.code === product.code&& p.id !== product.id);
            if (isDuplicate) {
                return('Producto duplicado');
            }
        const requiredFields = ['title', 'description', 'price','stock', 'category', 'img', 'code' ];
        const hasAllFields = requiredFields.every((field) => product[field]);
            if (!hasAllFields) {
                return('Faltan campos');
        }
        product.id = nanoid();
        const allProducts = [...oldProducts, product];
            console.log('Nuevos productos:', allProducts);
            await this.writeProducts(allProducts);
                return 'Producto Agregado';
      }
   /*  addProducts = async(product) => {
        let oldProd = await this.readProductsFile()
        product.id = nanoid()
        let allProducts = [...oldProd, product]
            await this.writeProducts(allProducts)
            return "Producto Agregado"
    }
 */
    getProducts = async() => {
            return await this.readProductsFile()
    }

    // busca el producto por id
    getProductsById = async(id) => {
        
        let prodById = await this.existTheProd(id)
            if(!prodById) return "El id del producto no existe"
            return prodById
    }

    // borra el producto por id
    deleteProd = async  (id) => {
        let products = await this.readProductsFile()
        let existProducts = products.some(product => product.id === id)
            if(existProducts){
                let prodFilter = products.filter(products => products.id != id) 
                await this.writeProducts(prodFilter)
                return "El Producto se elimino correctamente"
            }
            return "El producto que desea eliminar no existe"
    }

    // actualiza los campos del producto segun su id
    updateProducts = async( id, product) => {
        let prodById = await this.existTheProd(id)
            if(!prodById) return "El producto no existe"
            await this.deleteProd(id)
        let oldProd = await this.readProductsFile()    
        let newProd = [{...product, id : id}, ...oldProd]
            await this.writeProducts(newProd)
            return "Producto Actualizado correctamente"
    }
}

export default ProductManager