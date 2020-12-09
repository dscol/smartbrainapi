import express from 'express';
import cors from 'cors';
import knex from 'knex';
import bcrypt from 'bcrypt';
import handleRegister from './controllers/register.js';
import handleSignIn from './controllers/signin.js';
import handleProfileGet from './controllers/profile.js';
import image from './controllers/image.js';

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        database: 'smartbrain',
    }
});

const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('its working');
});

app.post('/signin', (req, res) => handleSignIn(req, res, bcrypt, db));
app.post('/register', (req, res) => handleRegister(req, res, bcrypt, db));
app.get('/profile/:id', (req, res) => handleProfileGet(req, res, db));
app.put('/image', (req, res) => image.handleImage(req, res, db));
app.post('/imageurl', (req, res) => image.handleApiCall(req, res));


app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
});


/*

/ --> res = this is working
/signin --> POST = success/failure
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user

*/