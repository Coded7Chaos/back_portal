import mongoose, { Document, Model, Schema } from "mongoose";

//interfaz de noticias para validar los tipos de datos enviados al crear una nueva noticia

export interface INews extends Document {
    title:string;
    subtitles?: string[];
    content: string[];
    images: string[];
    publishedAt: Date;
    author: {
        name: string;
        email: string;
    };
    categories?: String[];
}


//interfaz de noticias para validar los tipos de datos enviados al momento demodificar una noticia existente

export interface INewsUpdate {
    title?: string;
    subtitles?: string[];
    content?: string[];
    images?: string[];
    categories?: string[];
  }

//creando el modelo para las noticias en mongodb mediante mongoose

const NewsSchema  = new Schema({
    title:{ type: String, required: true },
    subtitles:  { type: [String], required: false },
    content: { type: [String], required: true },
    images: { type: [String], required: true },
    author: {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true,
            match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,}
    },
    categories: [String],
    publishedAt: { type: Date, default: Date.now, immutable: true },

},{
    timestamps: true,
    versionKey:false
})

const Noticia: Model<INews> = mongoose.model<INews>('Noticia', NewsSchema);

export default Noticia

 
