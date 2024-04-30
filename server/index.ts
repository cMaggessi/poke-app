import express from 'express';
import pokeRouter from './routes/pokeApi_router';
import cors from 'cors'

const app = express();

app.use(cors())
app.use('/api/v2/', pokeRouter);

const hostname = 'localhost';
const port = 8080;

app.listen(port, () => {
    console.log(`Server started at http://${hostname}:${port}`);
});
