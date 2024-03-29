import * as express from 'express';
import {Application} from "express";
import { loginUser, revokeToken, token } from './routers/login.route';
import { getProductById, products } from './routers/products';
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')

const app: Application = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + "/public"));

app.route('/login').post(loginUser);
app.route('/token').post(token);
app.route('/revoketoken').post(revokeToken);
app.route('/products').get(products);
app.route('/product/:id').get(getProductById);


const httpServer = app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:9000");
});