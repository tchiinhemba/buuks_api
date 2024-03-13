import express from 'express';
import gcpService from './src/services/gcpService/gcpConnection';

const PORT = 3000;

const server = express(); 

server.get('/', () => {
    console.log(gcpService)
})


server.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
});
