// mongosh --username admin --authenticationDatabase admin


// use admin
db.createUser(
    {
        user: "admin",
        pwd: "admin",
        roles: [
            {
                role: "root",
                db: "admin"
            }
        ]
    }
)

// Create new user 
db.createUser(
    {
        user: "user1",
        pwd: "user1",
        roles: [
            {
                role: "read",
                db: "lpu26"
            }
        ]
    }
)