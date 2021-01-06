import { Express } from "express";
import bodyParser from 'body-parser';
import cors from 'cors';

export default (app: Express) => {
    app.use(bodyParser.json())
    app.use(cors())
};
