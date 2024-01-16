const { MongoClient } = require('mongodb');

async function testConnection() {
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

try {
    await client.connect();

        // Get the database object
        const db = client.db('users');

        if(db.collection('users') != null){
            await db.dropCollection('users');
        }
        if(db.collection('transactions') != null){
            await db.dropCollection('transactions');
        }
        await db.createCollection('users');
        await db.createCollection('transactions');
        console.log('Collection "users" created successfully');
            // Insert sample users into the "users" collection
            const users = [
                {
                    username: 'user1',
                    name: 'asd',
                    surname: 'asd',
                    password: 'asd'
                },
                {
                    username: 'user2',
                    name: 'Jane',
                    surname: 'Smith',
                    password: 'password2'
                },
                {
                    username: 'user3',
                    name: 'Alice',
                    surname: 'Johnson',
                    password: 'password3'
                },
                {
                    username: 'user4',
                    name: 'Bob',
                    surname: 'Williams',
                    password: 'password4'
                }
            ];

            const transactions = [
                { "costo": 150, "desc": "Transaction 57", "year": 2023, "month": 1, "cat": "Category 1", "users": [{ "user": "user1", "quota": "72%" }, { "user": "user2", "quota": "12%" }, { "user": "user2", "quota": "7%" }, { "user": "user3", "quota": "9%" }] },
                { "costo": 955, "desc": "Transaction 6", "year": 2023, "month": 9, "cat": "Category 1", "users": [{ "user": "user1", "quota": "42%" }, { "user": "user2", "quota": "47%" }, { "user": "user2", "quota": "11%" }] },
                { "costo": 602, "desc": "Transaction 23", "year": 2022, "month": 9, "cat": "Category 4", "users": [{ "user": "user2", "quota": "11%" }, { "user": "user3", "quota": "89%" }] },
                { "costo": 390, "desc": "Transaction 61", "year": 2023, "month": 6, "cat": "Category 1", "users": [{ "user": "user2", "quota": "76%" }, { "user": "user4", "quota": "13%" }, { "user": "user2", "quota": "11%" }] },
                { "costo": 141, "desc": "Transaction 61", "year": 2023, "month": 5, "cat": "Category 2", "users": [{ "user": "user2", "quota": "37%" }, { "user": "user3", "quota": "26%" }, { "user": "user1", "quota": "7%" }, { "user": "user3", "quota": "30%" }] },
                { "costo": 748, "desc": "Transaction 64", "year": 2023, "month": 6, "cat": "Category 3", "users": [{ "user": "user4", "quota": "99%" }, { "user": "user3", "quota": "1%" }, { "user": "user2", "quota": "0%" }] },
                { "costo": 156, "desc": "Transaction 81", "year": 2020, "month": 8, "cat": "Category 1", "users": [{ "user": "user1", "quota": "6%" }, { "user": "user3", "quota": "53%" }, { "user": "user4", "quota": "17%" }, { "user": "user4", "quota": "24%" }] },
                { "costo": 137, "desc": "Transaction 36", "year": 2021, "month": 3, "cat": "Category 1", "users": [{ "user": "user3", "quota": "84%" }, { "user": "user4", "quota": "11%" }, { "user": "user3", "quota": "3%" }, { "user": "user1", "quota": "2%" }] },
                { "costo": 814, "desc": "Transaction 29", "year": 2022, "month": 9, "cat": "Category 0", "users": [{ "user": "user3", "quota": "23%" }, { "user": "user2", "quota": "77%" }] },
                { "costo": 479, "desc": "Transaction 3", "year": 2023, "month": 6, "cat": "Category 3", "users": [{ "user": "user2", "quota": "91%" }, { "user": "user1", "quota": "6%" }, { "user": "user3", "quota": "1%" }, { "user": "user4", "quota": "2%" }] }
            ];

                                
            await db.collection('users').insertMany(users);
            console.log('Sample users inserted successfully');

            
            await db.collection('transactions').insertMany(transactions);
            console.log('Sample transactions inserted successfully');
            
            await client.close();

} catch (err) {
    console.error('Error connecting to MongoDB:', err);
}
}

testConnection();
