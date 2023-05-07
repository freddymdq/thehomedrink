import fs from 'fs';
import __dirname from '../utils';

export default class ManagerAcces{

    async crearRegistro(metodo){

        const fecha = new date().tolocalDateString();
        const hora = new date().tolocalDateString();
        const message = `\nFecha: ${fecha} - Hora: ${hora} - Metodo: ${metodo}`

        await fs.promises.appendFile(__dirname + './log.txt',message, (error)=>{
            return error
        })
    }

}