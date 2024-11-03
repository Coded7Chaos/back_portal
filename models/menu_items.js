import mongoose from "mongoose";

//creando el modelo para la informacion de los items de navegacion en mongodb mediante mongoose

const MenuItemsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    link: { type: String, required: true }
})

const MenuItemsModel = mongoose.model("MenuItems", MenuItemsSchema)

export default mongoose.model("MenuItems", MenuItemsSchema)
