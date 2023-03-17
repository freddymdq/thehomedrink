class  ProductManager{
    constructor(){
        this.products = [];
    }

    static id = 0

    // Validamos el Codigo
    addProduct (title, description, price, image, code, stock){
        for(let i = 0 ; i < this.products.length ; i++){
            if(this.products[i].code === code ){
                console.log(`El codigo del producto ${code} esta repetido`);
                break;
            }
        }

    // Validamos todos los campos
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
    }
    getProducts(){
        return this.products;
    }

    existe (id) {
        return this.products.find((product) => product.id === id)
    }
    
    // ternario
    getProductsById (id){
        !this.existe(id) ? console.log('Producto no encontrado') : console.log(this.existe(id));        
    }
}

const productos = new ProductManager

// Arreglo vacio 
console.log(productos.getProducts())

// Agregado Productos 
productos.addProduct('SWING', "Whisky deluxe", 18750, 'image', 'cod001', 21 )
productos.addProduct('J.WALKER', "Whisky red label", 8750, 'image', 'cod002',33 )

// No busca el producto (falta de datos.)
productos.addProduct('ZACAPA', "Ron Destile deluxe reserve", 5750, 'image', 'cod004')

// Arreglo con producto
console.log(productos.getProducts())

// Validacion de CODE duplicado.
 productos.addProduct('J.WALKER', "Whisky black label", 10750, 'image', 'cod002', 22 )

// Buscamos por ID 
productos.getProductsById(2)

// Busqueda por ID no encontrado
productos.getProductsById(4)

