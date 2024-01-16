const { MongoClient } = require('mongodb');

async function testConnection() {
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

try {
    await client.connect();
    console.log('Connected successfully to MongoDB');

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

            const transactions = [{"costo":150,"desc":"Transaction 57","data":"2023-01-16T21:33:35.144Z","cat":"Category 1","users":[{"user":"user1","quota":"72%"},{"user":"user2","quota":"12%"},{"user":"user2","quota":"7%"},{"user":"user3","quota":"9%"}]},
                                    {"costo":955,"desc":"Transaction 6","data":"2023-09-13T19:04:21.738Z","cat":"Category 1","users":[{"user":"user1","quota":"42%"},{"user":"user2","quota":"47%"},{"user":"user2","quota":"11%"}]},
                                    {"costo":602,"desc":"Transaction 23","data":"2022-09-03T17:31:43.193Z","cat":"Category 4","users":[{"user":"user2","quota":"11%"},{"user":"user3","quota":"89%"}]},
                                    {"costo":390,"desc":"Transaction 61","data":"2023-06-25T02:08:08.403Z","cat":"Category 1","users":[{"user":"user2","quota":"76%"},{"user":"user4","quota":"13%"},{"user":"user2","quota":"11%"}]},
                                    {"costo":141,"desc":"Transaction 61","data":"2023-05-08T11:13:04.299Z","cat":"Category 2","users":[{"user":"user2","quota":"37%"},{"user":"user3","quota":"26%"},{"user":"user1","quota":"7%"},{"user":"user3","quota":"30%"}]},
                                    {"costo":748,"desc":"Transaction 64","data":"2023-06-24T09:35:11.250Z","cat":"Category 3","users":[{"user":"user4","quota":"99%"},{"user":"user3","quota":"1%"},{"user":"user2","quota":"0%"}]},
                                    {"costo":156,"desc":"Transaction 81","data":"2020-08-05T12:29:49.964Z","cat":"Category 1","users":[{"user":"user1","quota":"6%"},{"user":"user3","quota":"53%"},{"user":"user4","quota":"17%"},{"user":"user4","quota":"24%"}]},
                                    {"costo":137,"desc":"Transaction 36","data":"2021-03-08T02:42:56.139Z","cat":"Category 1","users":[{"user":"user3","quota":"84%"},{"user":"user4","quota":"11%"},{"user":"user3","quota":"3%"},{"user":"user1","quota":"2%"}]},
                                    {"costo":814,"desc":"Transaction 29","data":"2022-09-06T15:52:40.123Z","cat":"Category 0","users":[{"user":"user3","quota":"23%"},{"user":"user2","quota":"77%"}]},
                                    {"costo":479,"desc":"Transaction 3","data":"2023-06-13T14:02:46.599Z","cat":"Category 3","users":[{"user":"user2","quota":"91%"},{"user":"user1","quota":"6%"},{"user":"user3","quota":"1%"},{"user":"user4","quota":"2%"}]}
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
