import express from 'express'
import dotenv from 'dotenv'
import { authorize, listFiles } from './gcpConnection.js';


dotenv.config()

const PORT = process.env.PORT || 3000;

const server = express();

async function fetchDataAndStartServer() {
    try {
        const data = await authorize().then(listFiles);
        console.log(data);

        server.get('/', (req, res) => {
            res.json(data);
        })

        server.listen(PORT, () => {
            console.log(`Server is running at: http://localhost:${PORT}`);
        });

    } catch (error) {
        console.log(error)
    }
}

fetchDataAndStartServer()