import { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "./contacto.ts";


const postContacto = async (req: Request, res: Response) => {
    try {
    
        const {dni, nombreYapellidos, email, codigoPostal, codigoISO} = req.body;

       // Si ya existe el DNI en la DDBB devolverá un error 400.
       // Si falta alguno de los datos o algún dato es erróneo devolverá un error 500
        if (!dni || !nombreYapellidos || !email || !codigoPostal || !codigoISO ) {  
          res.status(500).send("No has introducido todos los datos necesarios");
          return;
        }

        // Validar los datos 
        
        if (typeof dni !== "string" && typeof nombreYapellidos !== "string" && typeof email !== "string"&& typeof codigoPostal !== "number"&& typeof codigoISO !== "string"){
            res.status(400).send("Hay algun dato sin el formato que debe")
        }

        const dnicomprobar = await ContactoModel.findOne({ dni: dni }).exec();

        if (dnicomprobar) {
            res.status(400).send('Este dni ya esta en la base de datos ');
          return;
        }
    
        const newContacto = new ContactoModel({ dni, nombreYapellidos, email, codigoPostal, codigoISO }); 
        await newContacto.save();
    
        res.status(200).send({
          dni: newContacto.dni,
          nombreYapellidos:newContacto.nombreYapellidos,
          email: newContacto.email,
          codigoPostal: newContacto.codigoPostal,
          codigoISO: newContacto.codigoISO
          
        });
      } catch (error) {
        res.status(500).send(error.message);
        return;
      }
    };
    
    export default postContacto;