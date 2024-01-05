const { MongoClient } = require('mongodb');

async function testConnection() {
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

try {
    await client.connect();
    console.log('Connected successfully to MongoDB');

        // Get the database object
        const db = await client.db('users');

        // Create the "users" collection
        await db.createCollection('users');
        console.log('Collection "users" created successfully');
            // Insert sample users into the "users" collection
            const users = [
                {
                    username: 'user1',
                    name: 'John',
                    surname: 'Doe',
                    password: 'password1'
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

            await db.collection('users').insertMany(users);
            console.log('Sample users inserted successfully');
            await client.close();

} catch (err) {
    console.error('Error connecting to MongoDB:', err);
}
}

testConnection();