const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let db;

async function connectDB() {
  if (!db) {
    try {
      await client.connect();
      db = client.db("mongoDB");
      console.log("✅ MongoDB Connected");
    } catch (err) {
      console.error("❌ Failed to connect to MongoDB. Is mongod running?");
      console.error("   Error:", err.message);
      process.exit(1);
    }
  }
  return db;
}

module.exports = connectDB;
