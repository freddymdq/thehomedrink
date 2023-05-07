import { Router } from "express";
import ManagerAcces from "../controllers/managerAcces.js";


const router = Router()
const managerAcces = new ManagerAcces()

router.get ('/' async (req, res) => {
    await managerAcces.crearRegistros ("get")
    res.send({msg: "get"})
})

router.get ('/' async (req, res) => {
    res.send({msg: "post"})
})

export default router