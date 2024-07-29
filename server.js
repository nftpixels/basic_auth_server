const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/validate-access-code', (req, res) => {
    const { accessCode } = req.body;

    if (!accessCode) {
        console.error('Access code is missing.');
        return res.status(400).json({ error: 'Access code is required.' });
    }

    const validAccessCodes = process.env.VALID_ACCESS_CODES.split(',');
    const validApiKeys = process.env.ACCESS_TOKENS.split(',');

    const uppercaseAccessCode = accessCode.toUpperCase();

    const index = validAccessCodes.indexOf(uppercaseAccessCode);
    if (index !== -1) {
        const randomIndex = Math.floor(Math.random() * validApiKeys.length);
        const apiKey = validApiKeys[randomIndex];

        return res.status(200).json({ apiKey });
    } else {
        return res.status(404).json({ error: 'Invalid access code.' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
