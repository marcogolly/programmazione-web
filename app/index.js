const express = require('express');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const session = require('express-session');
const uri = "mongodb://mongohost";
const app = express();
const cors = require('cors');

app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded());
app.use(express.json());
app.use(session({
    secret: 'segreto',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // set this to false in development
        httpOnly: false, // set this to false in development
    },
}));

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
}));

// Serve index.html as the landing page
app.get('/', (req, res) => {
    res.send('nodejs running correctly');
});

// Database connection helper function
async function connectToDatabase() {
    const client = new MongoClient(uri);
    await client.connect();
    return client.db('users');
}

// Authentication middleware
function verify(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(403).send('Non autenticato');
    }
}

// Get current user
app.get('/api/budget/whoami', async (req, res) => {
    if(req.session.user){
        res.json(req.session.user);
    }
    else{
        res.send(null);
    }
});

// User sign in
app.post('/api/auth/signin', async (req, res) => {
    try{
    const db = await connectToDatabase();
    const users = db.collection('users');
    const db_user = await users.findOne({ username: req.body.username });
    if (db_user && db_user.password === req.body.password) {
        req.session.user = db_user;
        req.session.authorized = true;
        res.json(db_user);
    } else {
        res.status(403).send('Credenziali errate');
    }
    }catch(err){
        console.log(err);
        res.send('Errore')
    }
});

// User sign up
app.post('/api/auth/signup', async (req, res) => {

    const db = await connectToDatabase();
    const collection = db.collection('users');
    const user = {
        username: req.body.username,
        name: req.body.name,
        surname: req.body.surname,
        password: req.body.password,
    };
    collection.findOne({ username: user.username }, (err, result) => {
        if (result) {
            res.status(403).send('Username già utilizzato');
        }
        else if (user.username === '' || user.name === '' || user.surname === '' || user.password === '') {
            res.status(403).send('Compila tutti i campi');
        }
        else if (user.password.length < 8) {
            res.status(403).send('La password deve essere lunga almeno 8 caratteri');
        }
        else if (user.username.length < 4) {
            res.status(403).send('Lo username deve essere lungo almeno 4 caratteri');
        }
        else {
            collection.insertOne(user);
            req.session.user = user;
            req.session.authorized = true;
            res.json(user);
        }
    });
});

// Get all transactions for the current user
app.get('/api/budget', verify, async (req, res) => {
    try{
        const db = await connectToDatabase();
        const collection = db.collection('transactions');
        const user = req.session.user.username;
        const transactions = await collection.find({[`users.${user}`]: { $exists: true },
        }).toArray();

        res.json(transactions);
    }catch(err){
        console.log(err);
        res.send('Errore');
    }

});

// Get transactions for a specific year and month for the current user
app.get('/api/budget/:year/:month', verify, async (req, res) => {
    try{
        const db = await connectToDatabase();
        const collection = db.collection('transactions');
        const user = req.session.user.username;
        
        const start = new Date(req.params.year, req.params.month - 1, 1);
        const end = new Date(req.params.year, req.params.month, 1);

        const transactions = await collection.find({
            [`users.${user}`]: { $exists: true },
            data: { $gte: start, $lt: end },
        }).toArray();

        res.json(transactions);
    } catch(err){
        console.log(err);
        res.send('Errore');
    }

});

// Get a specific transaction for the current user
app.get('/api/budget/:year/:month/:id', verify, async (req, res) => {

    try{
        const db = await connectToDatabase();
        const collection = db.collection('transactions');
        const transaction = await collection.find({
            _id: new ObjectId(req.params.id),
        }).toArray();
        res.json(transaction);
    }catch(err){
        console.log(err);
        res.send('Errore');
    }
});

// Add a new transaction for a specific year and month for the current user
app.post('/api/budget/:year/:month', verify, async (req, res) => {
    try{
        const db = await connectToDatabase();
        const collection = db.collection('transactions');
        const transaction = {
            desc: req.body.desc,
            data: new Date(req.body.data),
            costo: parseInt(req.body.costo),
            cat: req.body.cat,
            users: req.body.users,
        };

        
        if(transaction.desc === '' || transaction.data === '' || transaction.costo === '' || transaction.cat === ''){
            throw new Error('Compila tutti i campi');
        }
        else if(transaction.users.length === 0){
            throw new Error('Seleziona almeno un utente');
        }
        else if (Object.values(transaction.users).some(quota => quota === 0)) {
            throw new Error('La quota di ogni utente deve essere diversa da 0');
        }
        else if (Object.values(transaction.users).reduce((acc, quota) => acc + quota, 0) !== transaction.costo) {
            console.log(transaction.users);
            throw new Error('La somma delle quote degli utenti deve essere uguale al costo');
        }
        else{
            await collection.insertOne(transaction);
            res.send('Transaction added successfully');
        }
    }catch(err){
        console.log(err);
        res.status(403).send(err.message || 'Errore');
    }
});

// Update a specific transaction for the current user
app.put('/api/budget/:year/:month/:id', verify, async (req, res) => {
    try{
        const db = await connectToDatabase();
        const collection = db.collection('transactions');
        let transaction = {
            desc: req.body.desc,
            data: new Date(req.body.data),
            costo: parseInt(req.body.costo),
            cat: req.body.cat,
            users: req.body.users,
        }
    
        if(transaction.desc === '' || transaction.data === '' || transaction.costo === '' || transaction.cat === ''){
            throw new Error('Compila tutti i campi');
        }
        else if(transaction.users.length === 0){
            throw new Error('Seleziona almeno un utente');
        }
        else if (Object.values(transaction.users).some(quota => quota === 0)) {
            throw new Error('La quota di ogni utente deve essere diversa da 0');
        }
        else if (Object.values(transaction.users).reduce((acc, quota) => acc + quota, 0) !== transaction.costo) {
            console.log(transaction.users);
            throw new Error('La somma delle quote degli utenti deve essere uguale al costo');
        }
        else{
            await collection.updateOne(
                { _id: new ObjectId(req.params.id), },
                { $set: transaction }
            );
            res.send('Transaction updated successfully');
        }
    }catch(err){
        console.log(err);
        res.status(403).send(err.message || 'Errore');
    }
});

// Delete a specific transaction for the current user
app.delete('/api/budget/:year/:month/:id', verify, async (req, res) => {
    try{
        const db = await connectToDatabase();
        const collection = db.collection('transactions');
        await collection.deleteOne({
            _id: new ObjectId(req.params.id),
        });
        res.send('Transaction deleted successfully');
    }catch(err){
        console.log(err);
        res.send('Errore');
    }
});

// Get balance for the current user
app.get('/api/balance', verify, async (req, res) => {
    try{
        const db = await connectToDatabase();
        const collection = db.collection('transactions');
        const username = req.session.user.username;
        let transactions = await collection.find({
            [`users.${username}`]: { $exists: true },
        }).toArray();
        transactions = transactions
            .map((transaction) => {
                const { desc, data, cat, users } = transaction;
                    return { desc, data, cat, quota: users[username] };
            })
        res.json(transactions);
    }catch(err){
        console.log(err);
        res.send('Errore');
    }
});

// Get balance for a specific user
app.get('/api/balance/:id', verify, async (req, res) => {
    try{
        const db = await connectToDatabase();
        const collection = db.collection('transactions');
        const curr_username = req.session.user.username;
        const other_username = req.params.id;
        let transactions = await collection.find({
            [`users.${curr_username}`]: { $exists: true },
            [`users.${other_username}`]: { $exists: true },
        }).toArray();
        transactions = transactions
            .map((transaction) => {
                const { desc, data, cat, users } = transaction;
                return { desc, data, cat, quota: users[curr_username], other_quota: users[other_username] };

            })
        res.json(transactions);
    }catch(err){
        console.log(err);
        res.send('Errore');
    }
});

// Search transactions for the current user
app.get('/api/budget/search', verify, async (req, res) => {
    try{
        const db = await connectToDatabase();
        const collection = db.collection('transactions');
        const user = req.session.user.username;
        const transactions = await collection.find({
            [`users.${user}`]: { $exists: true },
            desc: { $regex: req.query.q, $options: 'i' },
        }).toArray();
        res.json(transactions);

    }catch(err){
        console.log(err);
        res.send('Errore');
    }
});

// Get transactions for a specific year for the current user
app.get('/api/budget/:year', verify, async (req, res) => {
    try{
        const db = await connectToDatabase();
        const collection = db.collection('transactions');
        
        const user = req.session.user.username;
        const year = parseInt(req.params.year);
        const start = new Date(year, 0, 1);
        const end = new Date(year, 12, 31);

        const transactions = await collection.find({
            [`users.${user}`]: { $exists: true },
            data: { $gte: start, $lt: end },
        }).toArray();
        res.json(transactions);
    }catch(err){
        console.log(err);
        res.send('Errore');
    }
});


app.get('/api/users/search', verify, async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');
        
        const username = req.session.user.username; // Get the username of the current user
        let users = await collection.find({
            [`username`]: { $regex: req.query.q, $options: 'i' },
        }).toArray();
        
        users = users.filter(user => user.username !== username);
        
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("Errore del server");
    }
});


app.listen(3000);
