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

            /*const transactions = [
                { "cost": 150, "desc": "Transaction 57", "date": new Date("2023-01-01"), "cat": "Category 1", "users": { "user1": 50, "user2": 30, "user3": 70 }, "user": "user1" },
                { "cost": 955, "desc": "Transaction 6", "date": new Date("2023-09-01"), "cat": "Category 1", "users": { "user1": 318, "user2": 477, "user3": 160 }, "user": "user2" },
                { "cost": 602, "desc": "Transaction 23", "date": new Date("2022-09-01"), "cat": "Category 4", "users": { "user2": 120, "user3": 482 }, "user": "user2" },
                { "cost": 390, "desc": "Transaction 61", "date": new Date("2023-06-01"), "cat": "Category 1", "users": { "user2": 234, "user4": 78, "user3": 78 }, "user": "user2" },
                { "cost": 141, "desc": "Transaction 61", "date": new Date("2023-05-01"), "cat": "Category 2", "users": { "user2": 63, "user3": 63, "user1": 15 }, "user": "user2" },
                { "cost": 748, "desc": "Transaction 64", "date": new Date("2023-06-01"), "cat": "Category 3", "users": { "user4": 518, "user3": 148, "user2": 82 }, "user": "user4" },
                { "cost": 156, "desc": "Transaction 81", "date": new Date("2020-08-01"), "cat": "Category 1", "users": { "user1": 20, "user3": 40, "user4": 20 }, "user": "user1" },
                { "cost": 137, "desc": "Transaction 36", "date": new Date("2021-03-01"), "cat": "Category 1", "users": { "user3": 50, "user4": 30, "user1": 10 }, "user": "user3" },
                { "cost": 814, "desc": "Transaction 29", "date": new Date("2022-09-01"), "cat": "Category 0", "users": { "user3": 214, "user2": 600 }, "user": "user3" },
                { "cost": 479, "desc": "Transaction 3", "date": new Date("2023-06-01"), "cat": "Category 3", "users": { "user2": 288, "user1": 96, "user3": 95 }, "user": "user2" },
                { "cost": 321, "desc": "Transaction 102", "date": new Date("2023-10-01"), "cat": "Category 5", "users": { "user1": 100, "user2": 121, "user3": 100 }, "user": "user1" },
                { "cost": 478, "desc": "Transaction 103", "date": new Date("2022-05-01"), "cat": "Category 3", "users": { "user2": 200, "user3": 178, "user4": 100 }, "user": "user2" },
                { "cost": 589, "desc": "Transaction 104", "date": new Date("2023-04-01"), "cat": "Category 6", "users": { "user3": 289, "user4": 200, "user1": 100 }, "user": "user3" },
                { "cost": 703, "desc": "Transaction 105", "date": new Date("2022-11-01"), "cat": "Category 4", "users": { "user4": 150, "user1": 353, "user2": 200 }, "user": "user4" },
                { "cost": 215, "desc": "Transaction 106", "date": new Date("2023-07-01"), "cat": "Category 2", "users": { "user1": 100, "user2": 45, "user3": 70 }, "user": "user1" },
                { "cost": 432, "desc": "Transaction 107", "date": new Date("2022-08-01"), "cat": "Category 1", "users": { "user2": 300, "user3": 100, "user4": 32 }, "user": "user2" },
                { "cost": 576, "desc": "Transaction 108", "date": new Date("2023-02-01"), "cat": "Category 5", "users": { "user3": 100, "user4": 200, "user1": 276 }, "user": "user3" },
                { "cost": 189, "desc": "Transaction 109", "date": new Date("2021-12-01"), "cat": "Category 3", "users": { "user4": 67, "user1": 22, "user2": 100 }, "user": "user4" },
                { "cost": 894, "desc": "Transaction 110", "date": new Date("2023-03-01"), "cat": "Category 6", "users": { "user1": 500, "user2": 200, "user3": 194 }, "user": "user1" },
                { "cost": 507, "desc": "Transaction 111", "date": new Date("2022-06-01"), "cat": "Category 4", "users": { "user2": 300, "user3": 100, "user4": 107 }, "user": "user2" },
                { "cost": 653, "desc": "Transaction 112", "date": new Date("2023-09-01"), "cat": "Category 1", "users": { "user3": 300, "user4": 250, "user1": 103 }, "user": "user3" },
                { "cost": 427, "desc": "Transaction 113", "date": new Date("2022-04-01"), "cat": "Category 2", "users": { "user4": 100, "user1": 177, "user2": 150 }, "user": "user4" },
                { "cost": 289, "desc": "Transaction 114", "date": new Date("2023-01-01"), "cat": "Category 5", "users": { "user1": 40, "user2": 199, "user3": 50 }, "user": "user1" },
                { "cost": 548, "desc": "Transaction 115", "date": new Date("2022-10-01"), "cat": "Category 3", "users": { "user2": 150, "user3": 200, "user4": 198 }, "user": "user2" },
                { "cost": 721, "desc": "Transaction 116", "date": new Date("2023-08-01"), "cat": "Category 6", "users": { "user3": 300, "user4": 200, "user1": 300 }, "user": "user3" },
                { "cost": 196, "desc": "Transaction 117", "date": new Date("2022-07-01"), "cat": "Category 4", "users": { "user4": 100, "user1": 56, "user2": 40 }, "user": "user4" },
                { "cost": 835, "desc": "Transaction 118", "date": new Date("2023-05-01"), "cat": "Category 1", "users": { "user1": 450, "user2": 270, "user3": 115 }, "user": "user1" },
                { "cost": 382, "desc": "Transaction 119", "date": new Date("2022-03-01"), "cat": "Category 2", "users": { "user2": 200, "user3": 100, "user4": 82 }, "user": "user2" },
                { "cost": 579, "desc": "Transaction 120", "date": new Date("2023-02-01"), "cat": "Category 5", "users": { "user3": 300, "user4": 170, "user1": 109 }, "user": "user3" },
                { "cost": 473, "desc": "Transaction 121", "date": new Date("2022-11-01"), "cat": "Category 3", "users": { "user4": 100, "user1": 173, "user2": 200 }, "user": "user4" },
                { "cost": 639, "desc": "Transaction 122", "date": new Date("2023-07-01"), "cat": "Category 4", "users": { "user1": 300, "user2": 200, "user3": 139 }, "user": "user1" },
                { "cost": 294, "desc": "Transaction 123", "date": new Date("2022-06-01"), "cat": "Category 2", "users": { "user2": 120, "user3": 100, "user4": 74 }, "user": "user2" },
                { "cost": 512, "desc": "Transaction 124", "date": new Date("2023-04-01"), "cat": "Category 5", "users": { "user3": 250, "user4": 150, "user1": 112 }, "user": "user3" },
                { "cost": 385, "desc": "Transaction 125", "date": new Date("2022-01-01"), "cat": "Category 3", "users": { "user4": 100, "user1": 185, "user2": 100 }, "user": "user4" },
                { "cost": 768, "desc": "Transaction 126", "date": new Date("2023-08-01"), "cat": "Category 6", "users": { "user1": 400, "user2": 200, "user3": 168 }, "user": "user1" },
                { "cost": 173, "desc": "Transaction 127", "date": new Date("2022-03-01"), "cat": "Category 1", "users": { "user2": 50, "user3": 73, "user4": 50 }, "user": "user2" },
                { "cost": 927, "desc": "Transaction 128", "date": new Date("2023-05-01"), "cat": "Category 4", "users": { "user3": 500, "user4": 300, "user1": 127 }, "user": "user3" },
                { "cost": 431, "desc": "Transaction 129", "date": new Date("2022-12-01"), "cat": "Category 2", "users": { "user4": 100, "user1": 200, "user2": 131 }, "user": "user4" },
                { "cost": 634, "desc": "Transaction 130", "date": new Date("2023-02-01"), "cat": "Category 5", "users": { "user1": 300, "user2": 200, "user3": 134 }, "user": "user1" },
                { "cost": 518, "desc": "Transaction 131", "date": new Date("2022-10-01"), "cat": "Category 3", "users": { "user4": 100, "user1": 250, "user2": 168 }, "user": "user4" },
            ];*/
            const transactions = [
                { "cost": 150, "desc": "Transaction 57", "date": new Date("2023-01-01"), "cat": "Category 1", "users": { "user1": 50, "user2": 30, "user3": 70 }, "user": "user1" },
                { "cost": 0, "desc": "Transaction 6", "date": new Date("2023-09-01"), "cat": "Category 1", "users": { "user1": -30, "user2": 30 }, "user": "user2" },
                { "cost": 0, "desc": "Transaction 23", "date": new Date("2022-09-01"), "cat": "Category 4", "users": { "user1": -70, "user3": 70 }, "user": "user3" },
                { "cost": 100, "desc": "Transaction 61", "date": new Date("2023-06-01"), "cat": "Category 1", "users": { "user1": 50, "user2": 20, "user3": 30 }, "user": "user2" },
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
