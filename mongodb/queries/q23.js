// Create folder mongo_replica
// Create folders usa, uk, india
// Inside mongo_replica folder

// mongod --replSet rs1 --dbpath "C:\Users\Sayan\Desktop\PepMern\mongo_replica\usa" --port 27018
// mongod --replSet rs1 --dbpath "C:\Users\Sayan\Desktop\PepMern\mongo_replica\uk" --port 27019
// mongod --replSet rs1 --dbpath "C:\Users\Sayan\Desktop\PepMern\mongo_replica\india" --port 27020

// mongosh --port 27018
// rs.initiate({
//     _id: "rs1",
//     members: [
//         { _id: 0, host: "localhost:27018" },
//         { _id: 1, host: "localhost:27019" },
//         { _id: 2, host: "localhost:27020" }
//     ]
// })

// rs.status()

// rs.conf()

// new tab
// mongosh "mongodb://localhost:27018,localhost:27019,localhost:27020/?replicaSet=rs1" 

// mongosh --port 27019
// db.getMongo().setReadPref("secondary")
// use mydatabase
// db.users.find()

// mongosh --port 27020
// db.getMongo().setReadPref("secondary")
// use mydatabase
// db.users.find()

// Now down the primary server and check the read operations in secondary servers. You will see that the read operations are still working fine in secondary servers. This is the advantage of using replica sets in MongoDB.
// To stop the primary server, you can use the following command in the terminal where the primary server is running:
// mongosh --port 27018
// use admin
// db.shutdownServer()
// After shutting down the primary server, you can check the status of the replica set using the following command in any of the secondary servers:
// rs.status()
// You will see that one of the secondary servers has been elected as the new primary server, and the read operations will continue to work without any interruption.