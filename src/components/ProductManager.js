import {promises as fs} from "fs"

 export default class ProductManager {
    constructor(){
        this.path = "./products.json"
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
/* const products = new ProductManager


 // Productos agregados al FS
products.addProduct("SWING","Delux whisky reserve ",23780,'https://i.ibb.co/3Bhwm06/img-swing.png', "cod001", 34)
products.addProduct("J.WALKER","Red Label",13780,'https://i.ibb.co/VVyb8kt/jhonnie-walker-red-label.png', "cod002", 24)
products.addProduct("J.WALKER","Black Label",14780,'https://i.ibb.co/RzYCMS5/jhonnie-walker.png', "cod003", 24) 
products.addProduct("SINGLETON","Whisky reserve",13780,"https://i.ibb.co/0MLB74Z/img-the-singleton.png", "cod004", 25)
products.addProduct("ZACAPA","Delux Ron Destile",18780,"https://i.ibb.co/0MWFj0D/img-zunca.png", "cod005", 34)
products.addProduct("SHERIDANS","Aperitive",11780,"https://i.ibb.co/G9rs3xn/img-sheridan.png", "cod006", 24)
products.addProduct("VAT-69","Black Label",2180,"https://i.ibb.co/N9j6h1c/VAT-69-Whisky.png", "cod007", 54)
products.addProduct("TANQUERRAY","London Dry Gin",2780,"https://i.ibb.co/hRpvrhr/tanqueray-london-dry-gin.png", "cod008", 34)
products.addProduct("TANQUERRAY","Flor de Sevilla Dry Gin",14780,"https://i.ibb.co/L9j6zzV/tanqueray-flor-de-sevilla-gin.png", "cod009", 27)
products.addProduct("BAILES","Aperitive Caramel",2380,"https://i.ibb.co/FK7X2sK/baileys.png", "cod0010", 29)
products.addProduct("SMIRNOFF","Vodka Green Apple",1880,"https://i.ibb.co/mC9Dvxv/smirnoff-apple.png", "cod0011", 12)
products.addProduct("KETEL ONE","Vodka LimitOne",1780,"https://i.ibb.co/hM1sRgP/Ketel-One-VODKA.png", "cod0012", 54)
products.addProduct("CARDHU","Whisky Aged 20 Year",14780, "https://i.ibb.co/jwgDDPT/cardhu.png", "cod0013", 34)
 
 */
/* products.getProduct()
products.getProductById(3) */

// Update producto
/* products.updateProduct({
    title: 'J.WALKER',
    description: 'Black Label',
    price: 17780,
    img: 'https://i.ibb.co/RzYCMS5/jhonnie-walker.png',
    code: 'cod003',
    stock: 25,
    id: 3
  }) 
 */

// borramos producto segun id 
/* products.deleteProduct(2)  */

