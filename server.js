import express from 'express'
import { listFiles, dataset } from './src/services/gcpService/gcpConnection';

const PORT = 3000;

const dataset = invokGCP();


const server = express();


server
    .get('/', (req, res) => {
        res.json(dataset);
    });



server.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
})