import { Request, Response } from 'express';
import Noticia, { INews, INewsUpdate } from "../models/news.js";



//funcion para ver los datos en nuestro mongo db, relacionado a noticias
export const getNews = async (req: Request, res: Response)  :Promise<void> => {
    try{
    const news = await Noticia.find({})
    res.status(200).json(news);
    }catch(error){
        res.status(500).json({ message: 'Error al buscar las noticias' });
    }
}



export const getNewsById = async (req: Request, res: Response)  :Promise<void> => {
        const {id} = req.params
    try{
        const noticia = await Noticia.findById(id)
        if (!noticia) {
            res.status(404).json({ message: 'Noticia no encontrada' });
            return ;
        }
        res.status(200).json(noticia)
    } catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error al mostrar la noticia' });
    }
}

export const addNews = async (req: Request, res: Response)  :Promise<void> => {
    console.log(req.body)
    try{
        const newData: INews = req.body

        console.log(req.body)
        const nNoticia = new Noticia( newData )
        
        await nNoticia.save()
            res.status(201).json(nNoticia)
    } catch(error: any){ 
        // Verifica si el error es un duplicado de clave única
        if (error.code === 11000 && error.keyPattern.title) {
            res.status(400).json({ error: "Ya existe una noticia con ese título" });
        } else {
            res.status(500).json({ error: "Error al crear la noticia" });
        }
    }
};

export const updateNews = async (req: Request, res: Response)  :Promise<void> => {
    const { id } = req.params;
    const newdata: INewsUpdate = req.body;

    try {
        // Busca la noticia por su ID
        const noticia = await Noticia.findByIdAndUpdate(id, newdata, { new: true }); // Devuelve el documento actualizado

        if (!noticia) {
             res.status(404).json({ message: 'Noticia no encontrada' });
             return;
        }

        res.status(200).json({
            message: "Noticia actualizada de manera correcta!",
            noticia
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la noticia' });
    }
};



export const deleteNews = async (req: Request, res: Response)  :Promise<void> => {
    const {id} = req.params
try{
    const noticia = await Noticia.findByIdAndDelete(id)
    if (!noticia) {
         res.status(404).json({ message: 'Noticia no encontrada' });
         return;
    }
    res.status(200).json({ message: 'Noticia eliminada correctamente' })
} catch(error){
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la noticia' });
}
}
