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
    const db = await connectToDatabase();
    const users = db.collection('users');
    const db_user = await users.findOne({ username: req.body.username });
    if (db_user && db_user.password === req.body.password) {
        req.session.user = db_user;
        req.session.authorized = true;
        res.json(db_user);
    } else {
        res.status(403).send('Non autenticato!');
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
    await collection.insertOne(user);
    res.json(user);
});

// Get all transactions for the current user
app.get('/api/budget', verify, async (req, res) => {
    const db = await connectToDatabase();
    const collection = db.collection('transactions');
    const user = req.session.user.username;
    const transactions = await collection.find({
        [`users.${user}`]: { $exists: true },
    }).toArray();
    res.json(transactions);
});

// Get transactions for a specific year and month for the current user
app.get('/api/budget/:year/:month', verify, async (req, res) => {
    const db = await connectToDatabase();
    const collection = db.collection('transactions');
    const user = req.session.user.username;
    
    const start = new Date(req.params.year, req.params.month - 1, 1);
    const end = new Date(req.params.year, req.params.month, 1);
    console.log(start);
    console.log(end);
    const transactions = await collection.find({
        //[`users.${user}`]: { $exists: true },
        data: { $gte: start, $lt: end },
    }).toArray();
    res.json(transactions);
});

// Get a specific transaction for the current user
app.get('/api/budget/:year/:month/:id', verify, async (req, res) => {
    const db = await connectToDatabase();
    const collection = db.collection('transactions');
    const transaction = await collection.find({
        _id: new ObjectId(req.params.id),
    }).toArray();
    res.json(transaction);
});

// Add a new transaction for a specific year and month for the current user
app.post('/api/budget/:year/:month', verify, async (req, res) => {
    console.log(req.body);
    const db = await connectToDatabase();
    const collection = db.collection('transactions');
    const newTransaction = {
        desc: req.body.desc,
        data: req.body.data,
        costo: parseInt(req.body.costo),
        cat: req.body.cat,
        users: req.body.users,
    };
    await collection.insertOne(newTransaction);
    res.send('Transaction added successfully');
});

// Update a specific transaction for the current user
app.put('/api/budget/:year/:month/:id', verify, async (req, res) => {
    try{
        const db = await connectToDatabase();
        const collection = db.collection('transactions');
        const user = req.session.user.username;
        const updatedTransaction = {
            desc: req.body.desc,
            data: new Date(req.body.data).toISOString().split('T')[0],
            costo: parseInt(req.body.costo),
            cat: req.body.cat,
            users: req.body.users,
        }
        console.log(updatedTransaction);
    await collection.updateOne(
        {
            _id: new ObjectId(req.params.id),
        },
        { $set: updatedTransaction }
    );
    res.send('Transaction updated successfully');
    }catch(err){
        console.log(err);
        res.send('Errore')
    }
});

// Delete a specific transaction for the current user
app.delete('/api/budget/:year/:month/:id', verify, async (req, res) => {
    const db = await connectToDatabase();
    const collection = db.collection('transactions');
    await collection.deleteOne({
        _id: new ObjectId(req.params.id),
    });
    res.send('Transaction deleted successfully');
});

// Get balance for the current user
app.get('/api/balance', verify, async (req, res) => {
    const db = await connectToDatabase();
    const collection = db.collection('transactions');
    const user = req.session.user.username;
    const transactions = await collection.find({
        [`users.${user}`]: { $exists: true },
    }).toArray();
    const newTransactions = transactions
        .map((transaction) => {
            const { desc, data, cat, users } = transaction;
            const desiredUser = req.session.user.username;
            if (users[desiredUser]) {
                return { desc, data, cat, quota: users[desiredUser] };
            }
        })
        .filter(Boolean);
    res.json(newTransactions);
});

// Get balance for a specific user
app.get('/api/balance/:id', verify, async (req, res) => {
    const db = await connectToDatabase();
    const collection = db.collection('transactions');
    const curr_username = req.session.user.username;
    const other_username = req.params.id;
    const transactions = await collection.find({
        [`users.${curr_username}`]: { $exists: true },
        [`users.${other_username}`]: { $exists: true },
    }).toArray();
    const newTransactions = transactions
        .map((transaction) => {
            const { desc, data, cat, users } = transaction;

            if (users[curr_username]) {
                return { desc, data, cat, quota: users[curr_username], other_quota: users[other_username] };
            }
        })
        .filter(Boolean);
    res.json(newTransactions);
});

// Search transactions for the current user
app.get('/api/budget/search', verify, async (req, res) => {
    const db = await connectToDatabase();
    const collection = db.collection('transactions');
    const user = req.session.user.username;
    const transactions = await collection.find({
        [`users.${user}`]: { $exists: true },
        desc: { $regex: req.query.q, $options: 'i' },
    }).toArray();
    res.json(transactions);
});

// Get transactions for a specific year for the current user
app.get('/api/budget/:year', verify, async (req, res) => {
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
});


app.get('/api/users/search', verify, async (req, res) => {

    const client = new MongoClient(uri);
    try {
        await client.connect();

        const databaseName = 'users';
        const db = client.db('users');
        const collection = db.collection(databaseName);
        
        const user = req.session.user.username; // Get the username of the current user
        const users = await collection.find({
            [`username`]: { $regex: req.query.q, $options: 'i' },
        }).toArray();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("Errore del server");
    } finally {
        await client.close();
    }

});


app.listen(3000);
