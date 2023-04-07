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
    
let prod1 = {title: "SWING", description :"Delux whisky reserve ", price : 23780, img : "https://i.ibb.co/3Bhwm06/img-swing.png", code : "cod001",stock : 34} 
    let prod2 = {title: "J.WALKER",description: "Red Label",price: 13780,img: "https://i.ibb.co/VVyb8kt/jhonnie-walker-red-label.png",code: "cod002",stock: 24}
    let prod3 = {title:"J. WALKER", description: "Black Label", price:11780, stock:7, foto: 'https://i.ibb.co/RzYCMS5/jhonnie-walker.png',code: "cod003", stock:24}
    let prod4 = {title: "SINGLETON",description: "Whisky reserve",price: 13780,img: "https://i.ibb.co/0MLB74Z/img-the-singleton.png",code: "cod004",stock: 25}
    let prod5 = {title: "ZACAPA", description: "Delux Ron Destile",price: 18780,img: "https://i.ibb.co/0MWFj0D/img-zunca.png",code: "cod005",stock: 34}
    let prod6 = {title: "SHERIDANS", description: "Aperitive", price: 11780, img: "https://i.ibb.co/G9rs3xn/img-sheridan.png",code: "cod006",stock: 24}
    let prod7 = {title: "VAT-69", description: "Black Label",price: 2180,img: "https://i.ibb.co/N9j6h1c/VAT-69-Whisky.png",code: "cod007",stock: 54}
    let prod8 = {title: "TANQUERRAY",description: "London Dry Gin", price: 2780,img: "https://i.ibb.co/hRpvrhr/tanqueray-london-dry-gin.png",code: "cod008", stock: 34}
    let prod9 = {title: "TANQUERRAY",description: "Flor de Sevilla Dry Gin",price: 14780,img: "https://i.ibb.co/L9j6zzV/tanqueray-flor-de-sevilla-gin.png",code: "cod009",stock: 27}
    let prod10 = {title: "BAILES",description: "Aperitive Caramel",price: 2380,img: "https://i.ibb.co/FK7X2sK/baileys.png",code: "cod0010",stock: 29}
    let prod11 = {title: "SMIRNOFF",description: "Vodka Green Apple",price: 1880,img: "https://i.ibb.co/mC9Dvxv/smirnoff-apple.png",code: "cod0011",stock: 12}
    let prod12 = {title: "KETEL ONE",description: "Vodka LimitOne",price: 1780, img: "https://i.ibb.co/hM1sRgP/Ketel-One-VODKA.png", code: "cod0012",stock: 54}
    let prod13 = {title: "CARDHU",description: "Whisky Aged 20 Year",price: 14780,img: "https://i.ibb.co/jwgDDPT/cardhu.png",code: "cod0013",stock: 34,}
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

