import mongoose, { Document, Schema, Model } from "mongoose";

export interface IDocente extends Document {
    cargo?: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    foto?: string;
    biografia?: string;
  }

//creando el modelo para la informacion de docentes en mongodb mediante mongoose

const DocentesSchema: Schema = new Schema({
    cargo: { type: String, required: false },
    nombre: { type: String, required: true },
    apellido_paterno: { type: String, required: true },
    apellido_materno: { type: String, required: true },
    foto: { type: String, required: false },
    biografia: { type: String, required: false }
})

const Docente: Model<IDocente> = mongoose.model<IDocente>("Docente", DocentesSchema);

export default Docente
