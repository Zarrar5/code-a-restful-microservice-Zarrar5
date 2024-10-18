const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

let users = []

app.post('/users', (req, res) => {
    const {name, email} = req.body;
    if (!name || !email) {
        return res.status(400).send('Missing name or email');
      }

    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.status(201).send(newUser);
  });

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
});

app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
      return res.status(404).send('User not found');
    }
  
    const { name, email } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
  
    res.send(user);
  });

app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) {
      return res.status(404).send('Book not found');
    }
  
    users.splice(userIndex, 1);
    res.status(204).send();
});
// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing