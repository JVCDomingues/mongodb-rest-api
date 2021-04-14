const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

require('./app/controllers/index')(app);

app.listen(4000, () => console.log('Servidor rodando na porta 4000'));