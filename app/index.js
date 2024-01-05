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


app.post('/api/login', async (req, res) => {  	
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

function verify(req, res, next){
    if(req.session.user){
        next();
    } else {
        res.status(403).send("Non autenticato");
    }
}

app.get('/api/restricted', verify, (req, res) => {
    //res.json(req.session.user);
    res.sendFile(`${__dirname}/public/login.html`);
});

app.get('/api/restricted2', verify, (req, res) => {
    
});
app.listen(3000);