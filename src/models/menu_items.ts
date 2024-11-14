import mongoose, { Model, Schema } from "mongoose";

//creando el modelo para la informacion de los items de navegacion en mongodb mediante mongoose

export interface IMenuItem{
    title: String; 
    link?: String;
    clase: String;
}

const MenuItemsSchema = new Schema({
    title: { type: String, required: true },
    link: { type: String, required: false },
    clase: { type: String, required: true } 
})

const MenuItem: Model<IMenuItem> = mongoose.model<IMenuItem>("MenuItem", MenuItemsSchema);

export default MenuItem