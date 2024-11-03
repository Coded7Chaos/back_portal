import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import moment from "moment";
import Docente from "./models/docentes.js";
import 'dotenv/config';
import cors from 'cors';
import menu_items from "./models/menu_items.js";
import newsRoutes from './routes/newsRoutes.js'


const app = express();


app.use(express.json())


const uri = process.env.DATABASE_URI;

mongoose.connect(uri)
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch(err => {
    console.error('Error al conectar a MongoDB:', err);

  });

app.use(cors())

app.use('/news', newsRoutes)

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



//sECCION PARA MANEJAR DATOS DE LOS DOCENTES 

const nuevoDocente = new Docente
({
    email: 'example@gmail.com',
    nombre: 'Orlando',
    apellido_paterno: 'Rivera',
    apellido_materno: 'algo',
    foto: "https://reqres.in/img/faces/1-image.jpg"
  });

nuevoDocente.save()
   .then(() => console.log("Datos del docente correctamente guardados"))
  .catch(err => console.log(err))








app.get("/docente", (req, res)=>{
    Docente.find({})
    .then(function(docentes){
        res.json(docentes)
    })
    .catch(function(error){
        console.log(error)
    })
})

app.get("/docente/:id", async (req, res) => {
        const {id} = req.params
    try{
        const docente = await Docente.findById(id)
        if (!docente) {
            return res.status(404).json({ message: 'Docente no encontrado' });
        }
        res.json(docente)
    } catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error al mostrar el docente' });
    }
})

app.post("/docente", async (req, res) => {
    try{
        console.log(req.body)
        const nDocente = new Docente({
            email: req.body.email,
            nombre: req.body.nombre,
            apellido_paterno: req.body.apellido_paterno,
            apellido_materno: req.body.apellido_materno,
            foto: req.body.foto
          })
        await nDocente.save()
        .then(docentes => {
            res.status(201).json(nDocente)
        })
        
    } catch(err){
        console.log(err);
        res.status(500).json({ message: 'Error al guardar datos del docente' });
    }
});

app.put('/docente/:id', async (req, res) => {
    const { id } = req.params;
    const { email, nombre, apellido_paterno, apellido_materno, foto } = req.body;

    try {
        // Busca el docente por su ID
        const docente = await Docente.findByIdAndUpdate(id, {
            email,
            nombre,
            apellido_paterno,
            apellido_materno,
            foto
        }, { new: true }); // Devuelve el documento actualizado

        if (!docente) {
            return res.status(404).json({ message: 'Docente no encontrado' });
        }

        res.status(200).json({
            message: "Datros del docente actualizados de manera correcta!",
            docente
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar datos del docente' });
    }
});



app.delete("/docente/:id", async (req, res) => {
    const {id} = req.params
try{
    const docente = await Docente.findByIdAndDelete(id)
    if (!docente) {
        return res.status(404).json({ message: 'Docente no encontrado' });
    }
    res.status(200).json({ message: 'Docente eliminado correctamente' })
} catch(error){
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el docente' });
}
})
