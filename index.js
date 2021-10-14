const express = require("express");
// able to call express server functionalities with app
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

//------ROUTES------//

// GET request, retrieve user data from database
app.get("/users", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users ORDER BY user_id");

    res.json(allUsers.rows); // render all users on page
  } catch (err) {
    console.error(err.message);
  }
});

// POST request to create new user data in database
app.post("/users", async (req, res) => {
  try {
    const { first_name, last_name, email, birthday, password } = req.body;
    const newUsers = await pool.query(
      "INSERT INTO users (first_name, last_name, email, birthday, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [first_name, last_name, email, birthday, password]
    );

    res.json(newUsers.rows[0])
  } catch (err) {
    console.error(err.message);
  }
});

// PUT request, edits any data currently stored in the database 
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { first_name, last_name, email, birthday, password } = req.body
    const updatedUser = pool.query('UPDATE users SET first_name = $1, last_name = $2, email = $3, birthday = $4, password = $5 WHERE user_id = $6', [first_name, last_name, email, birthday, password, id])

    res.json('User data was updated')
  } catch (err) {
    console.error(err.message)
  }
})

// DELETE request, used for deleting existing data from the database
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params
    await pool.query('DELETE FROM users WHERE user_id = $1', [id])

    res.json('User was deleted')
  } catch (err) {
    console.error(err.message)
  }
})

// setup app to run on http://localhost:5000/
app.listen(5000, () => {
  console.log("server is running on port 5000");
});
