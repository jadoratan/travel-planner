import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
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

app.post('/chat', async (req, res) => {
  const { message, trip } = req.body;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `You are a travel assistant. The user's trip: ${JSON.stringify(trip)}.
Suggest specific activity ideas. User: ${message}`,
    });
    res.json({ reply: response.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Chat failed' });
  }
});

// creates a new trip
app.post('/trips', async function(req, res) {
    const { user_id, name, destination, start_date, end_date } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO trips (user_id, name, destination, start_date, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [user_id, name, destination || null, start_date || null, end_date || null]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// gets all the logged-in user's trips, e.g. GET /trips?user_id=3
app.get('/trips', async function(req, res) {
    const { user_id } = req.query;
    try {
        const result = await pool.query(
            'SELECT * FROM trips WHERE user_id = $1 ORDER BY start_date NULLS LAST, id',
            [user_id]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// creates a manual entry for a category
const ENTRY_COLUMNS = {
  transportation: ['type','depart_location','arrive_location','depart_date','depart_time','arrive_date','arrive_time','cost','confirmation'],
  accommodations: ['name','street_address','address_line_2','city','state_province','zip_code','country','check_in','check_out','cost','confirmation'],
  activities:     ['name','location','date','start_time','end_time','cost','notes'],
};

for (const [table, cols] of Object.entries(ENTRY_COLUMNS)) {
  app.post(`/trips/:tripId/${table}`, async (req, res) => {
    // empty form fields arrive as "", which DATE/TIME/NUMERIC columns reject
    const values = cols.map(c => (req.body[c] === '' || req.body[c] === undefined) ? null : req.body[c]);
    const placeholders = cols.map((_, i) => `$${i + 2}`).join(', ');
    try {
      const result = await pool.query(
        `INSERT INTO ${table} (trip_id, ${cols.join(', ')}) VALUES ($1, ${placeholders}) RETURNING *`,
        [req.params.tripId, ...values]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
}


app.listen(3001, () => console.log('Server running on port 3001'))