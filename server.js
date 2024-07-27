const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(express.static('public'));

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Middleware to handle CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Endpoint to get server URL
app.get('/api/server-url', (req, res) => {
    const serverUrl = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
    res.json({ url: serverUrl });
});

// POST endpoint to handle Lua code execution
app.post('/api/execute', (req, res) => {
    const luaCode = req.body.code;
    console.log('Received Lua code:', luaCode);
    res.json({ result: 'Code received and processed.' });
});

// Catch-all for unsupported methods
app.use((req, res, next) => {
    res.status(405).send('Method Not Allowed');
});

app.listen(port, () => {
    console.log(`Server running at https://${process.env.PROJECT_DOMAIN}.glitch.me`);
});
