import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";


import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import getContactos from "./getContactos.ts";
import getContactosDni from "./getContactoDni.ts";
import postContacto from "./postContacto.ts";
import putContacto from "./putContactoDni.ts";
import deleteContactoDni from "./deleteContactoDni.ts";
const env = await load();

const URL_MONGO = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!URL_MONGO) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

try{
    await mongoose.connect(URL_MONGO); 
    console.log ("Te has conectado correctamente")
    const app = express();
    app.use(express.json());

    app
  .get("/contactos", getContactos)
  .get("/contactos/:dni", getContactosDni)
  .post("/contactos", postContacto)
  .put("/contactos/:dni", putContacto)
  .delete("/contactos/:dni", deleteContactoDni); 

  app.listen(3000, () => console.info("Server listening on port 3000"));


}catch (e){
    console.log(e)
}

