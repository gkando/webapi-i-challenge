const express = require('express');
const db = require('./data/db.js');

const server = express();
server.use(express.json());

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello World');
})


server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({
            success: false,
            message: 'The users information could not be retrieved.',
            err,
        })
    })
})
server.get('/api/users/:id', (req, res) => {
    db.findById(req.params.id)
    .then(user => {
        if (user) {
            res.status(200).json({
                success: true,
                user,
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'The user with the specified ID does not exist.',
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            success: false,
            message: 'The users information could not be retrieved.',
            err,
        })
    })
})

server.delete('/api/users/:id', (req, res) => {
    db.remove(req.params.id)
    .then(user => {
        if (user) {
            res.status(200).json({
                success: true,
                user,
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'The user with the specified ID does not exist.',
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            success: false,
            message: 'The users could not be removed.',
            err,
        })
    })
})

server.put('/api/users/:id', (req, res) => {
    const name = req.body.name;
    const bio = req.body.bio;
    const user = req.body;
    console.log(req.body)

    // if (!name || !bio) {
        // res.status(404).json({
        //     success: false,
        //     message: 'Please provide name and bio for the user.',
        // })
    // } else {
    db.update(req.params.id, user)
        .then(updated => {
            if (updated) {
                res.status(200).json({
                    success: true,
                    updated,
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'The user with the specified ID does not exist.',
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            success: false,
            message: 'The user information could not be modified.',
            err,
        })
    })
})

server.post('/api/users', (req, res) => {
    console.log(req.body)
    const name = req.body.name;
    const bio = req.body.bio;
    const user = req.body;
    console.log(!name, name)
    console.log(!bio, bio)

    if (!name || !bio) {
        res.status(404).json({
            success: false,
            message: 'Please provide name and bio for the user.',
        })
    } else {
        db.insert(user)
        .then(newUser => {
            res.status(201).json({
                success: true, 
                newUser
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'There was an error while saving the user to the database',
                err
            })
        })
    }
})

server.listen(8000, () => console.log("API Running on Port 8000"));