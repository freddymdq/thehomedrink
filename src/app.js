import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import ProductRouter from './router/product.routes.js';
import CartRouter from "./router/cart.routes.js";
import __dirname from "./utils.js";
import ViewsRouter from "./router/views.routes.js";
import ProductManager from "./controllers/ProductManager.js";

const PORT = 8080;
const app = express();
const server = app.listen(PORT, ()=>{
    console.log('Servidor corriendo en puerto:'+ PORT);
})

// Estructura Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
// Estaticos
app.use(express.static(__dirname+'/public'));

// Vista de rutas
app.use('/',ViewsRouter)
app.use('/realTimeProducts',ViewsRouter)
app.use('/api/products/', ProductRouter);
app.use('/api/carts/', CartRouter);

//WebSocket
const io = new Server(server);
const product = new ProductManager();

io.on('connection', async Socket => {
    console.log('Usuario Conectado');
    const products = await product.getProducts();
    io.emit('productList', products)
    Socket.on('message', data => {
            io.emit('log', data)
    });
    Socket.on('product', async newProd=> {
        let newProduct = await product.addProduct(newProd);
        const products = await product.getProducts();
            io.emit('productList', products)
    });
    Socket.on('product', async delProd =>{
        let pid = await product.deleteProduct(delProd);
        const products = await product.getProducts();
            io.emit('productList', products)
    })
});
