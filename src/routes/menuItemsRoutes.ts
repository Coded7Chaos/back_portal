import express,  { Request, Response } from 'express';
import { getItems, addMenuItem, updateItem, deleteItem } from '../controllers/menuItemsController.ts';

const router = express.Router();

router.get("/", getItems);

router.post("/", addMenuItem);

router.put("/:id", updateItem);

router.delete("/:id", deleteItem);

export default router;