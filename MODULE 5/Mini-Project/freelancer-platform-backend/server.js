const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

//connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',  
    database: 'freelancer'  
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});


app.post('/api/projects', (req, res) => {
    const { title, description } = req.body;
    const query = 'INSERT INTO projects (title, description) VALUES (?, ?)';
    db.query(query, [title, description], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Failed to save project' });
        } else {
            res.status(200).json({ message: 'Project saved successfully' });
        }
    });
});


// for view detail
app.get('/projects/:id', (req, res) => {
    const projectId = req.params.id;
    const query = 'SELECT * FROM projects WHERE id = ?';
    
    db.query(query, [projectId], (err, results) => {
        if (err) {
            console.error('Error fetching project:', err);
            return res.status(500).json({ message: 'Error fetching project' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json(results[0]);
    });
});

// for service page
app.get('/projects', (req, res) => {
    const sql = 'SELECT * FROM projects';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// to edit project
app.put('/api/edit/:id', (req, res) => {
    const projectId = req.params.id;
    const { title, description } = req.body;
    
    const query = 'UPDATE projects SET title = ?, description = ? WHERE id = ?';
    db.query(query, [title, description, projectId], (err, result) => {
        if (err) {
            console.error('Error updating project: ', err);
            return res.status(500).json({ message: 'Error updating project' });
        }
        res.json({ message: 'Project updated successfully' });
    });
});



app.delete('/api/delete-project/:id', (req, res) => {
    const projectId = req.params.id;

   
    if (!projectId || isNaN(projectId)) {
        return res.status(400).json({ message: 'Invalid project ID' });
    }

    
    const query = 'DELETE FROM projects WHERE id = ?';
    
    db.query(query, [projectId], (err, result) => {
        if (err) {
            console.error('Error deleting project:', err);
            return res.status(500).json({ message: 'Failed to delete project' });
        }

       
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Project not found' });
        }

       
        res.status(200).json({ message: 'Project deleted successfully' });
    });
});


// start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});




// // Endpoint to handle user registration
// app.post("/register", (req, res) => {
//     const { name, email, password } = req.body;

//     // Check if user already exists
//     db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }

//         if (results.length > 0) {
//             return res.status(400).json({ message: "User already registered!" });
//         }

//         // Insert new user into the database
//         db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password], (err, result) => {
//             if (err) {
//                 return res.status(500).json({ error: err.message });
//             }

//             res.status(200).json({ message: "Registration successful!" });
//         });
//     });
// });

// // Login endpoint to validate the user
// app.post('/login', (req, res) => {
//     const { email, password } = req.body;
  
//     // Query the database for the user
//     db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }
  
//       if (results.length > 0) {
//         // User found, send success response
//         res.status(200).json({ message: 'Login successful!', email: email });
//       } else {
//         // Invalid credentials
//         res.status(400).json({ message: 'Invalid email or password' });
//       }
//     });
//   });
