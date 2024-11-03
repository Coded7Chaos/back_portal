import mongoose from "mongoose";

//creando el modelo para las noticias en mongodb mediante mongoose

const NewsSchema  = new mongoose.Schema({
    title:{ type: String, required: true },
    description:  { type: String, required: true },
    images: [String],
    publishedAt: { type: Date, default: Date.now },
    author: {
        name: String,
        email: String
    },
    categories: [String],
    content: String,
})

export default mongoose.model('Noticia', NewsSchema)

 
