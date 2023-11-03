import { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "./contacto.ts";

const putContacto = async (req: Request, res: Response) => {
  try {
    const {dni} = req.params;
    const {nombreYapellidos, email, codigoPostal, codigoISO } = req.body;

    //En caso de no existir el contacto con DNI indicado, devolverá un error 404
    const dnicomprobar = await ContactoModel.findOne({ dni: dni }).exec();

        if (!dnicomprobar) {
            res.status(404).send('Este dni no existe en la base de datos');
          return;
        }

        const ModificarContacto = await ContactoModel.updateOne(
            { dni: dni }, 
            {
              $set: {

                nombreYapellidos: nombreYapellidos,
                email:email,
                codigoPostal:codigoPostal,
                codigoISO:codigoISO

              },
            }
          );

   

    res.status(200).send('modificaciones realizadas con exito !!');
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default putContacto;