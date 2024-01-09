const express = require('express');
const { MongoClient } = require('mongodb');
const session = require('express-session');
const uri = "mongodb://mongohost";
const app = express();

app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded());
app.use(session({
    secret: 'segreto',
    resave: false
}));

// Serve index.html as the landing page
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/api/auth/signin', async (req, res)=>{
    res.sendFile(`${__dirname}/public/login.html`);
})

app.post('/api/auth/signin', async (req, res) => {  	
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const users = client.db("users");
        const db_user = await users.collection("users").findOne({username: req.body.username});
        if(db_user && db_user.password === req.body.password){
            req.session.user = db_user;
            res.redirect('/api/restricted');
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

app.get('/api/auth/signup', async (req, res)=>{
    res.sendFile(`${__dirname}/public/register.html`);
})

app.post('/api/auth/signup', async (req, res) => {  	
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log('Connected successfully to MongoDB');

        const databaseName = 'users';
        const db = client.db(databaseName);
        const collection = db.collection('users');
        const user = {username: req.body.username, name: req.body.name, surname: req.body.surname, password: req.body.password} 
        const asdasd = await collection.insertOne(user);
        console.log('User inserted successfully:', asdasd.insertedId);

        res.redirect('/api/auth/signin');
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

app.get('/api/restricted', verify, (req, res) => {
    res.json(req.session.user);
});

app.get('/api/budget', verify, async (req, res) => {

    res.sendFile(`${__dirname}/public/budget.html`);
});
app.get('/api/budget/:year', verify, async (req, res) => {

    res.send("todo");
});
app.get('/api/budget/:year/:month', verify, async (req, res) => {

        res.send("todo");
});
app.get('/api/budget/:year/:month/:id', verify, async (req, res) => {

        res.send("todo");

});
app.post('/api/budget/:year/:month', verify, async (req, res) => {

        res.send("todo");

});
app.put('/api/budget/:year/:month/:id', verify, async (req, res) => {

        res.send("todo");

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
app.get('/api/budget/whoami', verify, async (req, res) => {
    
        res.send("todo");

});
app.get('/api/users/search?q=query', verify, async (req, res) => {

        res.send("todo");

});


app.listen(3000);
