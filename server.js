import express from 'express';
import './src/services/gcpService/gcpConnection';

const PORT = 3000;

const app = express();

app.get('/', async (req, res) => {
    try {
        await listFiles(); 
        res.json(dataset); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving data' }); 
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
});
