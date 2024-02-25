import * as express from 'express';
import {Application} from "express";
import { loginUser, token } from './routers/login.route';
const bodyParser = require('body-parser');

const app: Application = express();
app.use(bodyParser.json());

app.route('/login').post(loginUser);
app.route('/token').post(token);


const httpServer = app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:9000");
});