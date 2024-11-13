import express,  { Request, Response } from 'express';
import { getDocentes, getDocenteById, addDocente, updateDocente, deleteDocente } from '../controllers/docentesController.ts';
//import * as docenteCtrl from '../controllers/docentesController';

const router = express.Router();

//router.post("/",docenteCtrl.addDocente);

router.get("/", getDocentes);

router.get("/:id", getDocenteById);

router.post("/", addDocente);

router.put("/:id", updateDocente);

router.delete("/:id", deleteDocente);

export default router;