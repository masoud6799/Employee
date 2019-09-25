const MongoClient = require('mongodb').MongoClient;
const url = 'localhost:27017'
const dbName = 'employee'
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
});

