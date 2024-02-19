import * as express from 'express';
import {Application} from "express";
const bodyParser = require('body-parser');

const app: Application = express();
app.use(bodyParser.json());
const cors = require('cors');

app.use(cors({origin: true}));


app.route('/').get((req, res) => res.send('Server working!'));


const httpServer = app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:9000");
});