const express = require('express');
const cors = require('cors');

env = process.env;
const app = express();
app.use(express.json());
app.use(cors());

const USER_ID = env.USER_ID || "aryan tiwari"; 
const EMAIL = env.EMAIL_ID || "aryantiwari090.com";
const ROLL_NUMBER = env.REG_NO || "22bcs14462";

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input format. Expecting an array." });
        }

        const numbers = data.filter(item => /^\d+$/.test(item));
        const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));

        const highestAlphabet = alphabets.length > 0
            ? [alphabets.sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' })).pop()]
            : [];

        res.json({
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers,
            alphabets,
            highest_alphabet: highestAlphabet
        });
    } catch (error) {
        res.status(500).json({ is_success: false, message: "Server error", error: error.message });
    }
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

const PORT = env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
