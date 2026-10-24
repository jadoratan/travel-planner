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

app.post('/login', function(req, res) {
    const {data} = req.body;
    console.log("Username: ", data.username);
    console.log("Password: ", data.password);
    res.json({ok : true});
});

app.listen(3001, () => console.log('Server running on port 3001'))