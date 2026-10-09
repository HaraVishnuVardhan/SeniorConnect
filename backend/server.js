const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("./config/db");

const app = express();

app.use(express.json());
app.get("/users", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users");

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to fetch users");
    }
});
app.get("/doubts", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM doubts");

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to fetch doubts");
    }
});
app.get("/doubts/:id", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM doubts WHERE id = $1",
            [req.params.id]
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to fetch doubt");
    }
});
app.post("/doubts", async (req, res) => {
    try {
        const { question_text, status, asked_by, sent_to } = req.body;

        const result = await pool.query(
            `INSERT INTO doubts (question_text, status, asked_by, sent_to)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [question_text, status, asked_by, sent_to]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to create doubt");
    }
});
app.post("/answers", async (req, res) => {
    try {
        const { answer_text, answered_by, doubt_id } = req.body;

        const result = await pool.query(
            `INSERT INTO answers (answer_text, answered_by, doubt_id)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [answer_text, answered_by, doubt_id]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to create answer");
    }
});
app.get("/doubts/:id/answers", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM answers WHERE doubt_id = $1",
            [req.params.id]
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to fetch answers");
    }
});
app.get("/doubts/:id/details", async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT
                doubts.question_text,
                doubts.status,
                answers.answer_text,
                answers.answered_by
             FROM doubts
             INNER JOIN answers
             ON doubts.id = answers.doubt_id
             WHERE doubts.id = $1`,
            [req.params.id]
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to fetch doubt details");
    }
});
app.get("/doubts/:id/details", async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT
                doubts.question_text,
                doubts.status,
                answers.answer_text,
                answers.answered_by
             FROM doubts
             INNER JOIN answers
             ON doubts.id = answers.doubt_id
             WHERE doubts.id = $1`,
            [req.params.id]
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to fetch doubt details");
    }
});
app.post("/auth/register", async (req, res) => {
    try {
        const { roll_no, name, password } = req.body;

        if (!roll_no || !name || !password) {
            return res.status(400).json({
                message: "Roll number, name and password are required"
            });
        }

        const existingUser = await pool.query(
            "SELECT id FROM users WHERE roll_no = $1",
            [roll_no]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users (roll_no, name, password_hash)
             VALUES ($1, $2, $3)
             RETURNING id, roll_no, name, created_at`,
            [roll_no, name, passwordHash]
        );

        res.status(201).json({
            message: "User registered successfully",
            user: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Registration failed"
        });
    }
});
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
