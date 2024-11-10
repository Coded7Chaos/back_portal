import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import moment from "moment";
import Docente from "./models/docentes.js";
import 'dotenv/config';
import cors from 'cors';
import menu_items from "./models/menu_items.ts";
import newsRoutes from './routes/newsRoutes.ts';
import menuItemsRoutes from './routes/menuItemsRoutes.ts';
import docentesRoutes from './routes/docentesRoutes';

const app = express();

const uri: string = process.env.DATABASE_URI || "";

const router = express.Router();

mongoose.connect(uri)
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch(err => {
    console.error('Error al conectar a MongoDB:', err);
  });



app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use('/news', newsRoutes)
app.use('/docente', docentesRoutes)
app.use('/items', menuItemsRoutes)


app.listen(3030,()=>{
    console.log("Server listening on port 3030")
})



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

// const nuevoDocente = new Docente
// ({
//     email: 'example@gmail.com',
//     nombre: 'Orlando',
//     apellido_paterno: 'Rivera',
//     apellido_materno: 'algo',
//     foto: "https://reqres.in/img/faces/1-image.jpg"
//   });

// nuevoDocente.save()
//    .then(() => console.log("Datos del docente correctamente guardados"))
//   .catch(err => console.log(err))







