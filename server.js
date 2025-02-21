const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

// Ruta GET para verificar si el servidor está en línea
app.get('/', (req, res) => {
    res.json({ status: "Webhook activo", message: "¡Tu servidor en Render está funcionando!" });
});

// Ruta POST para recibir datos y enviarlos a Pushover
app.post('/', async (req, res) => {
    const { token, user, message } = req.body;

    // Validar que los datos están presentes
    if (!token || !user || !message) {
        return res.status(400).json({ success: false, error: "Faltan datos en la solicitud. Se requiere token, user y message." });
    }

    try {
        const response = await axios.post('https://api.pushover.net/1/messages.json', null, {
            params: {
                token,
                user,
                message
            }
        });

        console.log("Mensaje enviado a Pushover:", message);
        res.json({ success: true, data: response.data });

    } catch (error) {
        console.error("Error enviando a Pushover:", error.response.data);
        res.status(500).json({ success: false, error: error.response.data });
    }
});

// Iniciar el servidor en el puerto correcto
app.listen(PORT, () => console.log(`Servidor webhook corriendo en puerto ${PORT}`));
