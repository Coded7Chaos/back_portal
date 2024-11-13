import mongoose, { Document, Schema, Model } from 'mongoose';

// Interfaz para el tipo de dato de los comentarios
export interface IComment extends Document {
  content: string;
  author: string;
  refId: mongoose.Types.ObjectId; // ID de referencia del documento al que se asocia
  refModel: string; // Modelo de referencia, ej: "Noticia" o "Evento"
  createdAt?: Date;
}

// Definición del esquema
const commentSchema: Schema<IComment> = new Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
  refId: { type: Schema.Types.ObjectId, required: true }, // ID del documento al que se refiere
  refModel: { type: String, required: true }, // Modelo de referencia
  createdAt: { type: Date, default: Date.now },
});

// Creación del modelo con el esquema y la interfaz
const Comment: Model<IComment> = mongoose.model<IComment>('Comment', commentSchema);

export default Comment;