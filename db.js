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
                { "costo": 150, "desc": "Transaction 57", "data": new Date("2023-01-01").toISOString().split('T')[0], "cat": "Category 1", "users": { "user1": 50, "user2": 30, "user3": 70 } },
                { "costo": 955, "desc": "Transaction 6", "data": new Date("2023-09-01").toISOString().split('T')[0], "cat": "Category 1", "users": { "user1": 318, "user2": 477, "user3": 160 } },
                { "costo": 602, "desc": "Transaction 23", "data": new Date("2022-09-01").toISOString().split('T')[0], "cat": "Category 4", "users": { "user2": 120, "user3": 482 } },
                { "costo": 390, "desc": "Transaction 61", "data": new Date("2023-06-01").toISOString().split('T')[0], "cat": "Category 1", "users": { "user2": 234, "user4": 78, "user3": 78 } },
                { "costo": 141, "desc": "Transaction 61", "data": new Date("2023-05-01").toISOString().split('T')[0], "cat": "Category 2", "users": { "user2": 63, "user3": 63, "user1": 15 } },
                { "costo": 748, "desc": "Transaction 64", "data": new Date("2023-06-01").toISOString().split('T')[0], "cat": "Category 3", "users": { "user4": 518, "user3": 148, "user2": 82 } },
                { "costo": 156, "desc": "Transaction 81", "data": new Date("2020-08-01").toISOString().split('T')[0], "cat": "Category 1", "users": { "user1": 20, "user3": 40, "user4": 20 } },
                { "costo": 137, "desc": "Transaction 36", "data": new Date("2021-03-01").toISOString().split('T')[0], "cat": "Category 1", "users": { "user3": 50, "user4": 30, "user1": 10 } },
                { "costo": 814, "desc": "Transaction 29", "data": new Date("2022-09-01").toISOString().split('T')[0], "cat": "Category 0", "users": { "user3": 214, "user2": 600 } },
                { "costo": 479, "desc": "Transaction 3", "data": new Date("2023-06-01").toISOString().split('T')[0], "cat": "Category 3", "users": { "user2": 288, "user1": 96, "user3": 95 } }
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
