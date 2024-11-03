import Noticia from "../models/news.js";



//funcion para ver los datos en nuestro mongo db, relacionado a noticias
export const getNews = async (req, res) => {
    Noticia.find({})
    .then(function(news){
        res.json(news)
    })
    .catch(function(error){
        console.log(error)
    })
}



export const getNewsById = async (req, res) => {
        const {id} = req.params
    try{
        const noticia = await Noticia.findById(id)
        if (!noticia) {
            return res.status(404).json({ message: 'Noticia no encontrada' });
        }
        res.json(noticia)
    } catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error al mostrar la noticia' });
    }
}

export const addNews = async (req, res) => {
    console.log(req.body)
    try{
        const newData = req.body

        console.log(req.body)
        const nNoticia = new Noticia( newData )
        
        await nNoticia.save()
        .then(noticia => {
            res.status(201).json(nNoticia)
        })
        
    } catch(error){ 
        // Verifica si el error es un duplicado de clave única
        if (error.code === 11000 && error.keyPattern.title) {
            res.status(400).json({ error: "Ya existe una noticia con ese título" });
        } else {
            res.status(500).json({ error: "Error al crear la noticia" });
        }
    }
};

export const updateNews = async (req, res) => {
    const { id } = req.params;
    const { title, description, images, author, categories, content } = req.body;

    try {
        // Busca la noticia por su ID
        const noticia = await Noticia.findByIdAndUpdate(id, {
            title,
            description,
            images,
            author,
            categories,
            content
        }, { new: true }); // Devuelve el documento actualizado

        if (!noticia) {
            return res.status(404).json({ message: 'Noticia no encontrada' });
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



export const deleteNews = async (req, res) => {
    const {id} = req.params
try{
    const noticia = await Noticia.findByIdAndDelete(id)
    if (!noticia) {
        return res.status(404).json({ message: 'Noticia no encontrada' });
    }
    res.status(200).json({ message: 'Noticia eliminada correctamente' })
} catch(error){
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la noticia' });
}
}
