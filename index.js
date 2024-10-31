import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Noticia from "./news.js";
import moment from "moment";



const app = express();

const uri = "mongodb+srv://camilarodas:p0rOzEfNa1n1Cek5@portal.1tiu6.mongodb.net/portal?retryWrites=true&w=majority&appName=portal"

mongoose.connect(uri)
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch(err => {
    console.error('Error al conectar a MongoDB:', err);

  });

app.listen(3030,()=>{
    console.log("Server listening on port 3030")
})

app.use(bodyParser.json())

//Creando una nueva noticia para probar desde el back 

// const nuevaNoticia = new Noticia({
//     title: 'Mi primera noticia',
//     description: 'Esta es una descripción'
//   });

//   nuevaNoticia.save()
//     .then(() => console.log("Noticia correctamente guardada"))
//     .catch(err => console.log(err))




//se envian todos los datos existentes, es decir, no se filtra nada por parametro y sol ose envia un req vacio 
app.get("/", (req, res)=>{
    console.log('This is working')
    res.send("Mi pagina principal")
})

//funcion para ver los datos en nuestro mongo db, relacionado a noticias
app.get("/news", (req, res)=>{
    Noticia.find({})
    .then(function(news){
        res.json(news)
    })
    .catch(function(error){
        console.log(error)
    })
})

app.get("/news/:id", async (req, res) => {
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
})

app.post("/news", async (req, res) => {
    try{
        if(!req.body.publishedAt){
        const fecha = req.body.publishedAt
        const fechaISO = moment(fecha, 'DD/MM/YYYY').format('YYYY-MM-DD');
    }
        
        console.log(req.body)
        const nNoticia = new Noticia({
            title : req.body.title,
            description: req.body.description,
            images: req.body.images,
            author: {
                name: req.body.author.name,
                email: req.body.author.email
            },
            categories: req.body.categories,
            content: req.body.content
        })
        
        await nNoticia.save()
        .then(noticia => {
            res.status(201).json(nNoticia)
        })
        
    } catch(err){
        console.log(err);
        res.status(500).json({ message: 'Error al guardar la noticia' });
    }
});

app.put('/news/:id', async (req, res) => {
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
});



app.delete("/news/:id", async (req, res) => {
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
})