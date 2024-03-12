import express from 'express'

const PORT = 3000;


const server = express();


server
    .get('/', (req, res) => {
        res.send("Hello World");
    });

    

server.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
})