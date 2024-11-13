import Comment, { IComment } from "../models/comentario.ts"
import { Request, Response } from 'express';

export const publishComment = async (req: Request, res: Response): Promise<void> => {
    try{
        const newdata: IComment = req.body;
        console.log(newdata);
        const nComment = new Comment( newdata );
        await nComment.save()
        res.status(201).json(nComment)
    } catch(err){
        console.log(err);
        res.status(500).json({ message: 'Error al guardar el comentario' });
    }
}

