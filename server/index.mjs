import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sequelize from './config/config.mjs'

const app = express()

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'DELETE'],
        credentials: true,
    })
);
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server Running on port ' + 3001);
    });
})