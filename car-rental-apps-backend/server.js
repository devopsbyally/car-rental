
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg'); // PostgreSQL client

const app = express();
const PORT = process.env.PORT || 4000;

// PostgreSQL connection setup using environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false },
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Function to create the bookings table (if it doesn't exist)
const createTable = async () => {
  const client = await pool.connect();
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS bookings (
        booking_id SERIAL PRIMARY KEY,
        car_id VARCHAR(50),
        car_name VARCHAR(255),
        car_manufacturer VARCHAR(255),
        city VARCHAR(100),
        pickup_location VARCHAR(255),
        pickup_date DATE,
        dropoff_date DATE,
        pickup_time TIME,
        dropoff_time TIME,
        contact_number VARCHAR(20)
      );
    `;
    await client.query(query);
  } catch (err) {
    console.error('Error creating table:', err);
  } finally {
    client.release();
  }
};

// Call createTable when the server starts
createTable();

// POST route to handle car booking
app.post('/api/bookings', async (req, res) => {
  const { carId, carName, carManufacturer, city, pickupLocation, pickupDate, dropoffDate, pickupTime, dropoffTime, contactNumber } = req.body;

  // Check if all required fields are provided
  if (!carId || !carName || !carManufacturer || !city || !pickupLocation || !pickupDate || !dropoffDate || !pickupTime || !dropoffTime || !contactNumber) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const client = await pool.connect();
    const query = `
      INSERT INTO bookings (
        car_id, car_name, car_manufacturer, city, pickup_location, pickup_date, dropoff_date, pickup_time, dropoff_time, contact_number
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;
    `;
    const values = [carId, carName, carManufacturer, city, pickupLocation, pickupDate, dropoffDate, pickupTime, dropoffTime, contactNumber];
    const result = await client.query(query, values);
    client.release();

    const newBooking = result.rows[0];
    return res.status(201).json({ message: 'Booking confirmed!', booking: newBooking });
  } catch (err) {
    console.error('Booking failed', err);
    return res.status(500).json({ message: 'Something went wrong while booking.' });
  }
});

// Endpoint to retrieve all bookings (for testing purposes)
app.get('/api/bookings', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM bookings;');
    client.release();
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ message: 'Error fetching bookings.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
