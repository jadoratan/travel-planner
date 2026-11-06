import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';

const app = express();

const pool = new Pool({
    host:'localhost',
    port:5432,
    user:'myuser',
    password:'mypassword',
    database:'mydatabase'
});

app.use(cors());

app.use(express.json());

app.post('/signup', async function(req, res) {
    const { first_name, last_name, username, password, dob } = req.body;
    //try to insert signed up user into database
    try {
        const result = await pool.query(
            'INSERT INTO users (first_name, last_name, username, password, dob) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            [first_name, last_name, username, password, dob]
        );
        res.status(201).json({ id: result.rows[0].id })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong '});
    }

});

app.post('/login', async function(req, res) {
    const { username, password } = req.body;
    //look for a user with matching username and password
    try {
        const result = await pool.query(
            'SELECT id FROM users WHERE username = $1 AND password = $2',
            [username, password]
        );
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        res.json({ id: result.rows[0].id });
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(3001, () => console.log('Server running on port 3001'))