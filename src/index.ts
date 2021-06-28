import express from 'express';
import cors from 'cors';
import { hasPermission, jwtCheck } from './auth';
import { searchForPhotos } from './pixa';

const app = express();
app.use(cors({
    origin: 'https://reactoddhours.com:3000'
}));
const port = process.env.PORT || 8080;


app.get('/ping', (req, res) => res.send('pong'));


app.get('/photos/:term/:size', jwtCheck, hasPermission('photo:search'), searchForPhotos);

app.listen(port, () => console.log(`listening on port ${port}`));