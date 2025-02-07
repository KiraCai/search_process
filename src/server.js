const express = require('express');
const axios = require('axios');

const app = express();

// Настроим CORS и CSP
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "script-src 'self' 'unsafe-eval'");
    res.setHeader('Access-Control-Allow-Origin', '*'); // Разрешаем запросы с других источников
    next();
});

// Роут для получения данных
app.get('/fetch-data', async (req, res) => {
    try {
        // Запрос к внешнему API
        const response = await axios.get('https://trouverunlogement.lescrous.fr/tools/37/search?bounds=-3.7351880734267815_53.173102984428084_8.547526770323241_43.73933253035327');
        console.log('Данные успешно получены'); //, response.data
        res.json(response.data);
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        res.status(500).send('Ошибка при получении данных');
    }
});

// Настройка порта
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

