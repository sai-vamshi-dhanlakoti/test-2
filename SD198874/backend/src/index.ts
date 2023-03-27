import express, { Express, Request, Response } from 'express';
import cors from 'cors'
import helmet from 'helmet'
import { APP_CONFIG } from './config';
import * as bodyParser from 'body-parser'
import Database from './db'
import inventoryRoutes from './routes/api/v1/inventory';

const app: Express = express();
app.use(helmet())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/v1/inventory', inventoryRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server ok');
});
const db = new Database()
db.connect()

app.listen(APP_CONFIG.PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${APP_CONFIG.PORT}`);
});