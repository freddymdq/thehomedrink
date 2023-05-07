import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import mongoose from "mongoose";
import __dirname from "./utils.js";
import ProductManager from "./controllers/ProductManager.js";
import routerP from "./router/products.routes.js";
import viewsRouter from "./router/views.routes.js";
import chatRouter from "./router/chat.routes.js"
import cartRouter from "./router/cart.routes.js"
import productRouter from "./router/product.routes.js"

const PORT = process.env.PORT || 8080;
const app = express();
const server = app.listen(PORT, ()=>{
    console.log('Servidor funcionando en el puerto: '+PORT);
})

const MONGO = 'mongodb+srv://freddymdq:federico@cluster0.wm7ahcr.mongodb.net/?retryWrites=true&w=majority'
const connect = mongoose.connect(MONGO);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
// Estaticos
app.use(express.static(__dirname+'/public'));
// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// routes
app.use('/api/prod', routerP)
app.use('/', viewsRouter)
app.use('/realTimeProducts', viewsRouter)
app.use('/api/chat', chatRouter)
app.use('/api/products/', productRouter);
app.use('/api/carts/', cartRouter);

const io = new Server(server);
const productManager = new ProductManager();
const messages = [];

io.on('connection', async Socket => {
    console.log('socket connected');
    const products = await productManager.getProducts();
    io.emit('productList', products);
    Socket.on('message', data => {
        io.emit('log', data);
    });
    Socket.on('productAdd', async newProd=> {
        let newProduct = await productManager.addProduct(newProd);
        const products = await productManager.getProducts();
        io.emit('productList', products);
    });
    Socket.on('productDeleted', async delProd =>{
        let pid = await productManager.deleteProduct(delProd);
        const products = await productManager.getProducts();
        io.emit('productList', products);
    });
    Socket.on('message', data=>{
        messages.push(data);
        io.emit('messageLogs', messages)
    })
    Socket.on('authenticated', (data) =>{      
        Socket.broadcast.emit('newUserConnected', data)
    })
});