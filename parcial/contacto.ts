import mongoose from "npm:mongoose@7.6.3"



export type Contacto = {
    dni: string, 
    nombreYapellidos: string,
    email: string,
    codigoPostal: number,
    codigoISO: string,

    
}

const Schema = mongoose.Schema; 

const ContactoSchema = new Schema ({
        dni: { type: String, required: true },
        nombreYapellidos: { type: String, required: true},
        email: { type: String, required: true},
        codigoPostal: { type: Number, required: true},
        codigoISO: { type: String, required: true}
       

      },
      { timestamps: true }
    );


export type ContactoModelType = mongoose.Document & Omit<Contacto, "dni">;  
export const ContactoModel = mongoose.model<ContactoModelType>("Contacto", ContactoSchema); 
export default ContactoModel; 