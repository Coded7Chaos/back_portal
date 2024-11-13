import Docente, { IDocente } from '../models/docentes.ts'
import { Request, Response } from 'express';


export const getDocentes = async (req: Request, res: Response): Promise<void> => {
    try{
        const docentes = await Docente.find({})
        res.json(docentes)
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Error al obtener los datos'})
    }
}

export const getDocenteById = async (req: Request, res: Response): Promise<void> => {
        const {id} = req.params;
    try{
        const docente = await Docente.findById(id);
        if (!docente){
            res.status(404).json({ message: 'Docente no encontrado' });
        }
        res.status(200).json(docente);
        return; 
    } catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error al mostrar el docente' });
    }
}

export const addDocente = async (req: Request, res: Response): Promise<void> => {
    try{
        const newdata: IDocente = req.body;
        console.log(newdata);
        const nDocente = new Docente( newdata );
        await nDocente.save()
        res.status(201).json(nDocente)
    } catch(err){
        console.log(err);
        res.status(500).json({ message: 'Error al guardar datos del docente' });
    }
}

export const updateDocente = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const newdata: IDocente = req.body;
    console.log(newdata);
    try {
        // Busca el docente por su ID
        const docente = await Docente.findByIdAndUpdate(id, newdata, { new: true }); // Devuelve el documento actualizado

        if (!docente) {
            res.status(404).json({ message: 'Docente no encontrado' });
            return;
        }

         res.status(200).json({
            message: "Datos del docente actualizados de manera correcta!",
            docente
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar datos del docente' });
    }
}



export const deleteDocente = async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params
try{
    const docente = await Docente.findByIdAndDelete(id)
    if (!docente) {
        res.status(404).json({ message: 'Docente no encontrado' });
        return ;
    }
    res.status(200).json({ message: 'Docente eliminado correctamente' })
} catch(error){
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el docente' });
}
}
