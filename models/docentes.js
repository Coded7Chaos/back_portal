import mongoose from "mongoose";

//creando el modelo para la informacion de docentes en mongodb mediante mongoose

const DocentesSchema = new mongoose.Schema({
    email: String,
    nombre: { type: String, required: true },
    apellido_paterno: { type: String, required: true },
    apellido_materno: { type: String, required: true },
    foto: String,
    biografia: String
})

const DocentesModel = mongoose.model("Docente", DocentesSchema)

export default mongoose.model("Docente", DocentesSchema)
