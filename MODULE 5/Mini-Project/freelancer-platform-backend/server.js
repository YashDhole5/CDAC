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



app.get('/projects', (req, res) => {
    const sql = 'SELECT * FROM projects';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
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
