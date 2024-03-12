import express from 'express';
import { listFiles } from './drive.js'; // Assuming you exported listFiles

const PORT = 3000;

const app = express(); // Use app instead of server (convention)

app.get('/', async (req, res) => {
    try {
        await listFiles(); // Call listFiles to populate dataset
        res.json(dataset); // Respond with the dataset
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving data' }); // Handle errors
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
});
