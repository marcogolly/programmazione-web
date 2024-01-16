const express = require('express');
const { MongoClient } = require('mongodb');
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
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    }
}));
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
}));

// Serve index.html as the landing page
app.get('/', (req, res) => {
    res.send(`nodejs running correctly`);
});


app.post('/api/auth/signin', async (req, res) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const users = client.db("users");
        const db_user = await users.collection("users").findOne({username: req.body.username});
        if(db_user && db_user.password === req.body.password){
            req.session.user = db_user;
            req.session.authorized = true;
            res.json(db_user);
        } else {
            res.status(403).send("Non autenticato!");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Errore del server");
    } finally {

        await client.close();
    }
});

app.post('/api/auth/signup', async (req, res) => {  	
    const client = new MongoClient(uri);
    try {
        await client.connect();

        const databaseName = 'users';
        const db = client.db(databaseName);
        const collection = db.collection('users');
        const user = {username: req.body.username, name: req.body.name, surname: req.body.surname, password: req.body.password} 
        const asdasd = await collection.insertOne(user);

        res.json(user);

    } catch (error) {
        console.error(error);
        res.status(500).send("Errore del server");
    } finally {
        await client.close();
    }
});

function verify(req, res, next){

    if(req.session.user){
        next();
    } else {
        res.status(403).send("Non autenticato");
    }
}

app.get('/api/budget', verify, async (req, res) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();

        const databaseName = 'transactions';
        const db = client.db('users');
        const collection = db.collection(databaseName);
        
        const user = req.session.user.username; // Get the username of the current user
        const transactions = await collection.find({
            "users": {
                $elemMatch: {
                    "user": user
                }
            }
        }).toArray();
        // Find transactions where the user exists in the "users" field
        
        res.json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).send("Errore del server");
    } finally {
        await client.close();
    }
});


app.get('/api/budget/:year', verify, async (req, res) => {

    const client = new MongoClient(uri);
    try {
        await client.connect();

        const databaseName = 'transactions';
        const db = client.db('users');
        const collection = db.collection(databaseName);
        
        const user = req.session.user.username; // Get the username of the current user
        const transactions = await collection.find({
            "users": {
                $elemMatch: {
                    "user": user
                }
            },
            "year": parseInt(req.params.year),
        }).toArray();
        // Find transactions where the user exists in the "users" field
        
        res.json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).send("Errore del server");
    } finally {
        await client.close();
    }
});
app.get('/api/budget/:year/:month', verify, async (req, res) => {

    const client = new MongoClient(uri);
    try {
        await client.connect();

        const databaseName = 'transactions';
        const db = client.db('users');
        const collection = db.collection(databaseName);
        
        const user = req.session.user.username; // Get the username of the current user
        const transactions = await collection.find({
            "users": {
                $elemMatch: {
                    "user": user
                }
            },
            "year": parseInt(req.params.year),
            "month": parseInt(req.params.month)
        }).toArray();
        // Find transactions where the user exists in the "users" field
        
        res.json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).send("Errore del server");
    } finally {
        await client.close();
    }
});
app.get('/api/budget/:year/:month/:id', verify, async (req, res) => {

    const client = new MongoClient(uri);
    try {
        await client.connect();

        const databaseName = 'transactions';
        const db = client.db('users');
        const collection = db.collection(databaseName);
        
        const user = req.session.user.username; // Get the username of the current user
        const transactions = await collection.find({
            "users": {
                $elemMatch: {
                    "user": user
                }
            },
            "year": parseInt(req.params.year),
            "month": parseInt(req.params.month),
            //"_id":req.params.id
        }).toArray();
        // Find transactions where the user exists in the "users" field
        
        res.json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).send("Errore del server");
    } finally {
        await client.close();
    }

});
app.post('/api/budget/:year/:month', verify, async (req, res) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();

        const databaseName = 'transactions';
        const db = client.db('users');
        const collection = db.collection(databaseName);
        
        const user = req.session.user.username; // Get the username of the current user
        const newTransaction = req.body; // Get the new transaction data from the request body
        
        // Add the user to the "users" field of the new transaction
        newTransaction.users = [{ user }];
        
        // Set the year and month of the new transaction
        newTransaction.year = parseInt(req.params.year);
        newTransaction.month = parseInt(req.params.month);
        
        // Insert the new transaction into the collection
        await collection.insertOne(newTransaction);
        
        res.send("Transaction added successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    } finally {
        await client.close();
    }
});
app.put('/api/budget/:year/:month/:id', verify, async (req, res) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();

        const databaseName = 'transactions';
        const db = client.db('users');
        const collection = db.collection(databaseName);
        
        const user = req.session.user.username; // Get the username of the current user
        const updatedTransaction = req.body; // Get the updated transaction data from the request body
        
        await collection.updateOne(
            {
                "users": {
                    $elemMatch: {
                        "user": user
                    }
                },
                "year": parseInt(req.params.year),
                "month": parseInt(req.params.month),
                "_id": req.params.id
            },
            {
                $set: updatedTransaction
            }
        );
        
        res.send("Transaction updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    } finally {
        await client.close();
    }
});
app.delete('/api/budget/:year/:month/:id', verify, async (req, res) => {

        res.send("todo");

});
app.get('/api/budget', verify, async (req, res) => {

        res.send("todo");

});
app.get('/api/budget/:id', verify, async (req, res) => {

        res.send("todo");

});
app.get('/api/budget/search?q=query', verify, async (req, res) => {

        res.send("todo");

});
app.get('/api/budget/whoami', async (req, res) => {
    console.log("ASDASDASD");
    console.log("ASDASDASD");
    console.log("ASDASDASD");
    console.log("ASDASDASD");
    console.log("ASDASDASD");
    console.log("ASDASDASD");
    if(req.session.user)
        res.json(req.session.user);
    else
        res.status(200).json('not authenticated');
        
    
});
app.get('/api/users/search?q=query', verify, async (req, res) => {

        res.send("todo");

});


app.listen(3000);
