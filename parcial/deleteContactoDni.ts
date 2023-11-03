import { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "./contacto.ts";


const eliminarContacto = async (req: Request, res: Response) => {
    try {
      const {dni} = req.params;

      if (!dni ) { 
        res.status(400).send("No has introducido el dni ");
        return;
      }

      //En caso de no existir el contacto con id indicado, devolverá un error 404
      const contactoEliminar = await ContactoModel.findOneAndDelete({dni: dni }).exec();

      if (!contactoEliminar) {
        res.status(404).send('Contacto no encontrado');
        return;
      }

      res.status(200).send("Contacto eliminado");
    } catch (error) {
      res.status(404).send(error.message);
      return;
    }
  };
  
  export default eliminarContacto;