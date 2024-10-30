import express from "express";
import fs from "fs";
import mongoose from "mongoose";
import Noticia from "./news.js";


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

//Creando una nueva noticia para probar desde el back 

const nuevaNoticia = new Noticia({
    title: 'Mi primera noticia',
    description: 'Esta es una descripción'
  });

  nuevaNoticia.save()
    .then(() => console.log("Noticia correctamente guardada"))
    .catch(err => console.log(err))




//se envian todos los datos existentes, es decir, no se filtra nada por parametro y sol ose envia un req vacio 
app.get("/", (req, res)=>{
    console.log('This is working')
    res.send("ORaleee")
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



app.post("/news", async (req, res) => {
    try{
        const nNoticia = new Noticia(req.body)
        await nNoticia.save()
        res.status(201).json(nNoticia)
    } catch(err){
        console.log(error);
        res.status(500).json({ message: 'Error al guardar la noticia' });
    }
});

