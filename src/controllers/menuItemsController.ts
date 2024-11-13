import MenuItems, { IMenuItems } from "../models/menu_items.ts"
import { Request, Response } from 'express';

export const getItems = async (req: Request, res: Response) :Promise<void> => {
    try{
        const items = await MenuItems.find({});
        res.json(items);
    }catch(error){
        console.log(error)
    }
}


export const addMenuItem = async (req: Request, res: Response) :Promise<void> => {
    try{
        const newdata: IMenuItems = req.body
        console.log(newdata)
        const nItem = new MenuItems( newdata )
        await nItem.save()
        res.status(201).json(nItem)
    } catch(err){
        console.log(err);
        res.status(500).json({ message: 'Error al crear nuevo item de menu' });
    }
}

export const updateItem = async (req: Request, res: Response) :Promise<void> => {
    const { id } = req.params;
    const newdata: IMenuItems = req.body;
    console.log(newdata);
    try {
        // Busca el Item por su ID
        const item = await MenuItems.findByIdAndUpdate(id, newdata, { new: true }); // Devuelve el documento actualizado
        
        if (!item) {
            res.status(404).json({ message: 'Item no encontrado' });
            return ;
        }

        res.status(200).json({
            message: "Item modificado correctamente!",
            item
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al modificar item' });
    }
}



export const deleteItem = async (req: Request, res: Response) :Promise<void> => {
    const {id} = req.params
try{
    const item = await MenuItems.findByIdAndDelete(id)
    if (!item) {
        res.status(404).json({ message: 'Item no encontrado' });
        return;
    }
    res.status(200).json({ message: 'Item eliminado correctamente' })
} catch(error){
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el item' });
}
}