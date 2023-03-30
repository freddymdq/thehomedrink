import {promises as fs} from "fs"

 export default class ProductManager {
    constructor(){
        this.path = "./product.txt"
        this.products = [];
    };

    static id = 0

    addProduct = async (title, description, price, img, code, stock) => {
        
        ProductManager.id++
            let newProduct = {title, description, price, img, code, stock, id: ProductManager.id}
            this.products.push(newProduct)
                                            // con stringify pasamos el objeto a un string
        await fs.writeFile(this.path, JSON.stringify(this.products))
        console.log(newProduct)
        
    };

    // Creo una funcion del readFile para no repetir tanto codigo.
    readFileProducts = async () => {
            let readFileP = await fs.readFile(this.path, "utf-8")
                // pasamos el string a un objeto
        return JSON.parse(readFileP)
    };

    getProduct = async () => {
            let getP = await this.readFileProducts()
        return console.table(getP)
       
    };

    getProductById = async (id) => {
            let getId = await this.readFileProducts()
            if(!getId.find(products=>products.id === id)){
                console.log("El producto no existe")
            }else{
                console.log(getId.find(products=>products.id === id))
            }
    }

 

  
    updateProduct = async ({id, ...product}) => {
        try{
            await this.deleteProduct(id)
            let oldProduct = await this.readFileProducts()
            let prodModification = [{...product, id},...oldProduct,]
            await fs.writeFile(this.path, JSON.stringify(prodModification))
            console.log(`Producto Modificado con ID: ${id}`)
            console.log(prodModification)

        }catch{
            console.log("El producto no se puede actualizar")
        }
     }

     deleteProduct = async (id) => {
            let deleteP = await this.readFileProducts()
            let filterId = deleteP.filter(products => products.id != id)
        await fs.writeFile(this.path, JSON.stringify(filterId))
            console.log("Producto eliminado")
    }

}
 const products = new ProductManager


 // Productos agregados al FS

/* products.addProduct("SWING","Delux whisky reserve ",23780,'https://i.ibb.co/3Bhwm06/img-swing.png', "cod001", 34)
products.addProduct("J.WALKER","Red Label",13780,'https://i.ibb.co/VVyb8kt/jhonnie-walker-red-label.png', "cod002", 24)
products.addProduct("J.WALKER","Black Label",14780,'https://i.ibb.co/RzYCMS5/jhonnie-walker.png', "cod003", 24) 
 */
 

products.getProduct()

// filtrado por ID el producto no existe
products.getProductById(4)

// filtrado por ID
products.getProductById(3)

// Update producto
products.updateProduct({
    title: 'J.WALKER',
    description: 'Black Label',
    price: 17780,
    img: 'https://i.ibb.co/RzYCMS5/jhonnie-walker.png',
    code: 'cod003',
    stock: 25,
    id: 3
  }) 



// borramos producto segun id 
/* products.deleteProduct(2)  */

