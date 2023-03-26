import {promises as fs}from "fs"

class ProductManager{
    constructor(){
        // creamos una ruta
        this.patch = "./productos.txt";
        this.products = []
    }

    static id = 0

    addProduct = async(title, description, price, img, code, stock) => {

        ProductManager.id++
        let newProduct = {
            title,
            description,
            price,
            img,
            code,
            stock,
            id: ProductManager.id
        }
        this.products.push(newProduct)

        // writefile me sobreescribe el producto inicial, para que no pase esto debemos generar un array vacio al cual llevemos los datos del nuevo producto
        await fs.writeFile(this.patch, JSON.stringify(this.products))
    }                                 // con stringify pasamos el objeto a un string


    // Creamos una funcion con el readFile, para no repetir codigo tando en getById como Getproduc o todos los metodos en los cuales necesitemos llamar al readFile.
    readFileProduct = async () => {
        let readF = await fs.readFile(this.patch, "utf-8")
        // para que me devuelva un objeto tenemos que agregar la respuesta,lo contrario a stringify osea parse.
        return JSON.parse(readF)
    }

    // --- CONSULTA ---
    getProducts = async() => {
        // si yo resuelvo esta funcion sin la variable, esto nunca me devolvera la promesa. 
        //return console.log (this.readFileProduct())
        
        // getP esta esperando que se resuelva el reeadFileProduct
        let getP = await this.readFileProduct()
        // una vez resuelto el readFileProduct devuelve la variable getP
        return console.log(getP)
    }

 // --- CONSULTA POR ID --- 
    getProductById = async(id) => {
        let getB = await this.readFileProduct()
        // Como tenemos que hacer la validacion  hay que tranformar a un if
        //let result = getB.find(product => product.id === id)

        // Esto lo podriamos tranformar a un operador ternario pero el await me rompe todo.
        if (!getB.find(product => product.id === id)){
            // si este resultado nos genera un undefined
            console.log("El producto no existe")
            // y si no, nos devuelve el producto 
        }else{
            console.log(getB.find(product => product.id === id))
        }
    };


  // ALGO NO ESTA BIEN, NO BORRA DEL WRITEFILE EL PRODUCTO SEGUN EL ID  
    borrarProductoPorId = async (id) => {
        let borrarP = await this.readFileProduct();
        let filtroP = borrarP.filter(products => products.id != id);

        await fs.writeFile(this.patch, JSON.stringify(filtroP));
        console.log("Producto Eliminado")
}

cargarProducto = async ({id, ...producto}) => { 
    let idP = producto.id
    console.log(idP)
}  
}

const productos = new ProductManager


//productos.addProduct("BUCANANS", "Whisky Import Deluxe","https://i.ibb.co/cFQRMQk/bucanans-delixe-whisky.png", 31780, "cod016", 42)
//productos.addProduct("CARDHU", "Whisky Aged 20 Year","https://i.ibb.co/jwgDDPT/cardhu.png", 14780, "cod015", 32)
//productos.addProduct("GRAND OLD PARR", "Whisky Aged 12 Year","https://i.ibb.co/TbqqJ3k/grand-old-parr-whisky.png", 19780, "cod014",22) 


//productos.getProducts()


// pedir por id existente
//productos.getProductById(1)
//productos.getProductById(2)

// pedir por id no encontrado
//productos.getProductById(5)


// borramos el producto segun el id
//productos.borrarProductoPorId(3)

productos.cargarProducto(
    {
        title: 'GRAND OLD PARR',
        description: 'Whisky Aged 12 Year',
        price: 'https://i.ibb.co/TbqqJ3k/grand-old-parr-whisky.png',
        img: 12780,
        code: 'cod014',
        stock: 22,
        id: 3
})