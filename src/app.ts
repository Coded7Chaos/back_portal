import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import morgan from 'morgan';
import newsRoutes from './routes/newsRoutes.ts';
import menuItemsRoutes from './routes/menuItemsRoutes.ts';
import docentesRoutes from './routes/docentesRoutes.ts';
import { createRoles } from './libs/initialSetup.ts'
import authRoutes from './routes/authRoutes.ts';
 const app = express();
 
createRoles();

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use('/api/news', newsRoutes)
app.use('/api/docente', docentesRoutes)
app.use('/api/items', menuItemsRoutes)
app.use('/api/auth', authRoutes)


export default app
