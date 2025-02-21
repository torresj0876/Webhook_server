const express = require('express');
const app = express();

app.use(express.json()); // Permite recibir JSON en las peticiones

app.post('/webhook', (req, res) => {
    console.log('Webhook recibido:', req.body);
    res.status(200).json({ message: 'Webhook recibido con éxito' });
});

// Usar el puerto dinámico asignado por Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor webhook corriendo en puerto ${PORT}`));

