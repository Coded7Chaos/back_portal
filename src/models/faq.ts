import mongoose, { Document, Schema, Model } from "mongoose";

export interface IInfo extends Document {
    contenido: String[]; 
    pregunta: String;    
}

//creando el modelo para la informacion de docentes en mongodb mediante mongoose

const InfoSchema: Schema = new Schema({
    contenido: { type: [String], required: true },
    pagina: { type: String, required: true }    
})

const Info: Model<IInfo> = mongoose.model<IInfo>("Info", InfoSchema);

export default Info
