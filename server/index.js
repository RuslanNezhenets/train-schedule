const express = require('express');
const cors = require('cors');
const router = require('./routes/index');
const { initialize } = require('./models/InitDB');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

const start = () => {
    try {
        initialize();
        app.listen(PORT, () => console.log(`Сервер запустился на порту ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();
