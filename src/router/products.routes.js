import { Router } from "express";
/* import ManagerAcces from "../controllers/managerAcces.js"; */
import productsModel from "../models/products.model.js";

/* const managerAcces = new ManagerAcces() */
const routerP = Router();
const productos = [
    {
		"title": "SWING",
		"description": "Delux whisky reserve ",
		"price": 23780,
        "category": 'whisky',
		"img": "https://i.ibb.co/3Bhwm06/img-swing.png",
		"status": true,
		"code": "cod001",
		"stock": 4
	},
	{
		"title": "J. WALKER",
		"description": "Red Label",
		"price": 8780,
        "category": 'whisky',
		"img": "https://i.ibb.co/VVyb8kt/jhonnie-walker-red-label.png",
		"status": true,
		"code": "cod002",
		"stock": 10
	},
	{
		"title": "J. WALKER",
		"description": "Black Label",
		"price": 11780,
        "category": 'whisky',
		"img": "https://i.ibb.co/RzYCMS5/jhonnie-walker.png",
		"status": true,
		"code": "cod003",
		"stock": 7
	},
	{
		"title": "SINGLETON",
		"description": "Whisky reserve",
		"price": 13780,
        "category": 'whisky',
		"img": "https://i.ibb.co/0MLB74Z/img-the-singleton.png",
		"status": true,
		"code": "cod004",
		"stock": 11
	},
	{
		"title": "ZACAPA",
		"description": "Delux Ron destile ",
		"price": 18780,
        "category": 'spirits',
		"img": "https://i.ibb.co/0MWFj0D/img-zunca.png",
		"status": true,
		"code": "cod005",
		"stock": 12
	},
	{
		"title": "SHERIDANS",
		"description": "Aperitive",
		"price": 11780,
        "category": 'aperitive',
		"img": "https://i.ibb.co/G9rs3xn/img-sheridan.png",
		"status": true,
		"code": "cod006",
		"stock": 19
	},
	{
		"title": "VAT 69",
		"description": "Whisky",
		"price": 2280,
        "category": 'whisky',
		"img": "https://i.ibb.co/N9j6h1c/VAT-69-Whisky.png",
		"status": true,
		"code": "cod007",
		"stock": 12
	},
	{
		"title": "TANQUERRAY",
		"description": "London Dry Gin",
		"price": 2280,
        "category": 'spirits',
		"img": "https://i.ibb.co/hRpvrhr/tanqueray-london-dry-gin.png",
		"status": true,
		"code": "cod008",
		"stock": 9
	}
]

routerP.get('/insert', async (req, res) => {
    const result = await productsModel.insertMany(productos)
    res.send({result})
})

routerP.get('/', async (req, res) => {
    const result = await productsModel.find();

    res.send({productos: result})
})

routerP.post('/', async (req, res) => {
    const {title, description, price, category, img, code, stock} = req.body
        if (!title || !description || !price || !category || !img || !code || !stock){
            return res.status(400).send({error: "Los valores estan incompletos"})
        }
    const product = {
        title,
        description,
        price,
        category,
        img,
        code,
        stock
    }
    const result = await productsModel.create(product)
    res.send({result})
})

routerP.put('/:pid', async (req, res) => {
    const id = req.params.pid
    const updateProduct = req.body
    const result = await productsModel.updateOne({_id:id}, {$set:updateProduct})
    res.send({result})
})

routerP.delete('/:pid', async (req, res) => {
    const id = req.params.pid
    const result = await productsModel.deleteOne({_id:id})
    res.send({result})
})

export default routerP