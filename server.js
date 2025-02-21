const express = require('express');
const app = express();

app.use(express.json()); // Permite recibir JSON en las peticiones

app.post('/webhook', (req, res) => {
    console.log('Webhook recibido:', req.body);
    res.status(200).send('Webhook recibido con éxito');
});

app.listen(3000, () => console.log('Servidor webhook corriendo en puerto 3000'));
