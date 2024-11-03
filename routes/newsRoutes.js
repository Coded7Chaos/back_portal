import express from 'express';
import { getNews, getNewsById, addNews, updateNews, deleteNews } from '../controllers/newsController.js';

const router = express.Router()

router.get("/", getNews);

router.get("/:id", getNewsById );

router.post("/", addNews);

router.put("/:id", updateNews);

router.delete("/:id", deleteNews);

export default router 