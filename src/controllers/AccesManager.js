import fs  from 'fs';

export default class AccesManager{
    createRecord = async(metodo)=>{
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();
        const message = `Fecha: ${date} - Hora: ${time} - Metodo: ${metodo}\n`;
        await fs.promises.appendFile('../models/log.txt', message, (err) => {return err;});
    }
}