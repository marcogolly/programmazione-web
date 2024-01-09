const { MongoClient } = require('mongodb');

async function resetDatabase() {
  const url = 'mongodb://localhost:27017';
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');

    const databaseName = 'users';
    const db = client.db(databaseName);

    // Drop the entire database
    await db.dropDatabase();
    console.log(`Database "${databaseName}" dropped successfully`);

    await client.close();
    console.log('Connection to MongoDB closed');
  } catch (err) {
    console.error('Error resetting database:', err);
  }
}

// Call the function to reset the database
resetDatabase();
