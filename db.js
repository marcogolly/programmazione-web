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
                    name: 'Mario',
                    surname: 'Rossi',
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
                { "cost": 0, "desc": "remboursment", "date": new Date("2023-01-01"), "cat": "Grocery", "users": {"user2": -20, "user3": 20 }, "user": "user3" },
                { "cost": 955, "desc": "Transaction 6", "date": new Date("2023-09-01"), "cat": "Grocery", "users": { "user1": 100, "user2": 200, "user3": 655 }, "user": "user1" },
                { "cost": 0, "desc": "remboursment", "date": new Date("2022-09-01"), "cat": "Entertainment", "users": { "user2": 1, "user3": -1 }, "user": "user2" },
                { "cost": 390, "desc": "Transaction 61", "date": new Date("2023-06-01"), "cat": "Grocery", "users": { "user2": 100, "user4": 200, "user3": 90 }, "user": "user2" },
                { "cost": 0, "desc": "remboursment", "date": new Date("2023-05-01"), "cat": "Streaming", "users": { "user2": -40, "user1": 40 }, "user": "user1" },
                { "cost": 500, "desc": "Transaction 64", "date": new Date("2023-06-01"), "cat": "Utilities", "users": { "user4": 300, "user3": 200, "user2": 100 }, "user": "user4" },
                { "cost": 0, "desc": "remboursment", "date": new Date("2020-08-01"), "cat": "Grocery", "users": { "user1": -30, "user3": 60, "user4": -30 }, "user": "user3" },
                { "cost": 137, "desc": "Transaction 36", "date": new Date("2021-03-01"), "cat": "Grocery", "users": { "user3": 10, "user4": 27, "user1": 100 }, "user": "user3" },
                { "cost": 0, "desc": "remboursment", "date": new Date("2022-09-01"), "cat": "Utilities", "users": { "user3": 107, "user2": -107 }, "user": "user3" },
                { "cost": 479, "desc": "Transaction 3", "date": new Date("2023-06-01"), "cat": "Utilities", "users": { "user2": 48, "user1": 1, "user3": 430 }, "user": "user1" },
                { "cost": 0, "desc": "remboursment", "date": new Date("2023-10-01"), "cat": "Entertainment", "users": { "user1": -61, "user3": 61 }, "user": "user3" },
                { "cost": 478, "desc": "Transaction 103", "date": new Date("2022-05-01"), "cat": "Utilities", "users": { "user2": 100, "user3": 78, "user4": 300 }, "user": "user2" },
                { "cost": 589, "desc": "Transaction 104", "date": new Date("2023-04-01"), "cat": "Travel", "users": { "user3": 89, "user4": 250, "user1": 250 }, "user": "user3" },
                { "cost": 703, "desc": "Transaction 105", "date": new Date("2022-11-01"), "cat": "Utilities", "users": { "user4": 50, "user1": 600, "user2": 53 }, "user": "user4" },
                { "cost": 0, "desc": "remboursment", "date": new Date("2023-07-01"), "cat": "Streaming", "users": { "user1": -300, "user3": 300 }, "user": "user3" },
                { "cost": 432, "desc": "Transaction 107", "date": new Date("2022-08-01"), "cat": "Grocery", "users": { "user2": 132, "user3": 150, "user4": 150 }, "user": "user2" },
                { "cost": 576, "desc": "Transaction 108", "date": new Date("2023-02-01"), "cat": "Entertainment", "users": { "user3": 100, "user4": 200, "user1": 276 }, "user": "user3" },
                { "cost": 0, "desc": "remboursment", "date": new Date("2021-12-01"), "cat": "Utilities", "users": { "user4": 200, "user1": -200}, "user": "user4" },
                { "cost": 852, "desc": "Transaction 110", "date": new Date("2023-03-01"), "cat": "Travel", "users": { "user1": 226, "user2": 200, "user3": 426 }, "user": "user1" },
                { "cost": 500, "desc": "Transaction 111", "date": new Date("2022-06-01"), "cat": "Utilities", "users": { "user2": 100, "user3": 200, "user4": 200 }, "user": "user2" },
                { "cost": 650, "desc": "Transaction 112", "date": new Date("2023-09-01"), "cat": "Grocery", "users": { "user3": 250, "user4": 200, "user1": 200 }, "user": "user3" },
                { "cost": 400, "desc": "Transaction 113", "date": new Date("2022-04-01"), "cat": "Streaming", "users": { "user4": 100, "user1": 200, "user2": 100 }, "user": "user4" },
                { "cost": 400, "desc": "Transaction 114", "date": new Date("2023-01-01"), "cat": "Travel", "users": { "user1": 150, "user2": 100, "user3": 150 }, "user": "user1" },
                { "cost": 50, "desc": "Transaction 115", "date": new Date("2022-10-01"), "cat": "Utilities", "users": { "user2": 15, "user3": 15, "user4": 20 }, "user": "user2" },
                { "cost": 35, "desc": "Transaction 116", "date": new Date("2023-08-01"), "cat": "Travel", "users": { "user3": 5, "user4": 20, "user1": 10 }, "user": "user3" },
                { "cost": 200, "desc": "Transaction 117", "date": new Date("2022-07-01"), "cat": "Utilities", "users": { "user4": 100, "user1": 60, "user2": 40 }, "user": "user4" },
                { "cost": 0, "desc": "remboursment", "date": new Date("2023-05-01"), "cat": "Grocery", "users": { "user1": -450, "user2": 450 }, "user": "user2" },
                { "cost": 100, "desc": "Transaction 119", "date": new Date("2022-03-01"), "cat": "Streaming", "users": { "user2": 50, "user3": 50 }, "user": "user2" },
                { "cost": 50, "desc": "Transaction 120", "date": new Date("2023-02-01"), "cat": "Travel", "users": { "user1": 50}, "user": "user1" },
                { "cost": 35, "desc": "Transaction 121", "date": new Date("2022-11-01"), "cat": "Utilities", "users": { "user1": 35 }, "user": "user1" },
                { "cost": 0, "desc": "remboursment", "date": new Date("2023-07-01"), "cat": "Grocery", "users": { "user1": 300, "user3": -300 }, "user": "user1" },
                { "cost": 200, "desc": "Transaction 123", "date": new Date("2022-06-01"), "cat": "Streaming", "users": { "user2": 120, "user3": 100, "user4": 80 }, "user": "user2" },
                { "cost": 500, "desc": "Transaction 124", "date": new Date("2023-04-01"), "cat": "Travel", "users": { "user3": 350, "user4": 150 }, "user": "user3" },
                { "cost": 285, "desc": "Transaction 125", "date": new Date("2022-01-01"), "cat": "Utilities", "users": { "user4": 100, "user1": 100, "user2": 85 }, "user": "user4" },
                { "cost": 0, "desc": "remboursment", "date": new Date("2023-08-01"), "cat": "Travel", "users": { "user2": 200, "user3": 200 }, "user": "user1" }
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
