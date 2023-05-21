import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sequelize from './config/config.mjs'
import accountRoutes from './routes/accounts.mjs'
import journalEntryRoutes from './routes/journalEntries.mjs'

const app = express()
app.use(express.json());

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

app.use('/accounts', accountRoutes)
app.use('/journalEntry', journalEntryRoutes)


sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server Running on port ' + 3001);
    });
})