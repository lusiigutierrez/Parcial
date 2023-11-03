import { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "./contacto.ts";

export type StateFromAPI = {
  state: string; // pais
};

export type PlaceFromAPI = {
  place_name: string, //ciudad
}

const getContactosDni = async (req: Request, res: Response) => {
  try {

    const {dni} = req.param;

    const BuscarDni = await ContactoModel.findOne({dni: dni }).exec();

    if (!BuscarDni) {
      res.status(400).send('Este dni no esta en la base de datos ');
    return;
    }

    const codigopostal = BuscarDni.codigoPostal;
    const ISOcode = BuscarDni.codigoISO
    


    const ciudad = await fetch(
      `https://zip-api.eu/api/v1/info/${ISOcode}-${codigopostal}`

    );
    if (ciudad.status !== 200) {
      res.status(ciudad.status).send(ciudad.statusText);
      return;
    }

    const dataPlace: PlaceFromAPI = await ciudad.json();

    const place_name = dataPlace.place_name; 

   const pais = await fetch(
    `https://restcountries.com/v3.1/alpha/${ISOcode}`

  );

  
  
  if (pais.status !== 200) {
    res.status(pais.status).send(pais.statusText);
    return;
  }

   const dataState:  StateFromAPI = await pais.json();


   const state_name = dataState.state; 
   
    res.status(200).send({
      dni: BuscarDni.dni,
      nombreYapellidos: BuscarDni.nombreYapellidos,
      email: BuscarDni.email,
      codigopostal: BuscarDni.codigoPostal,
      codigoISO: BuscarDni.codigoISO,
      ciudad: place_name,
      pais: state_name
        
    })
 } catch (error) {
    res.status(404).send(error.message); 
    return;
  }
};

export default getContactosDni;

