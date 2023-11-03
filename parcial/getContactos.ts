import { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "./contacto.ts";


const getContactos = async (req: Request, res: Response) => {
  try {

   const contactos = await ContactoModel.find().exec(); 
   //const contactos = await ContactoModel.find( { }, { dni: 1, nombreYapellidos: 1 } )

    res.status(200).send(
        'Te he devuelto los contactos que tienes')
 } catch (error) {
    res.status(404).send(error.message); 
    return;
  }
};

export default getContactos;