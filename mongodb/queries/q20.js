// Sort name in asc order with case insesitive
db.people.find({}, { name: 1, _id: 0 }).sort({ name: 1 }).collation({ locale: "en", strength: 2 });

// Restriction in mogodb

// Create collection vendors
db.createCollection("vendors")

// Insert some documents
db.vendors.insertOne({ name: "John", age: 21 })
db.vendors.insertOne({ age: 25 })
db.vendors.insertOne({ name: 312233, age: "kjhfhjwebf" })

// We will ensure restriction on name to be present and string and age to be present and number
db.createCollection("vendors", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "age"],
            properties: {
                name: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                age: {
                    bsonType: ["number", "null"], // allow age to be null if not provided
                    description: "must be a number and is required",
                    minimum: 10 // set a minimum age of 10
                }
            }
        }
    },
    validationLevel: "moderate" // moderate means that the validation will be applied to all inserts and updates, but existing documents 
    // that do not meet the criteria will not be affected, strict means that the validation will be applied to all inserts and updates, 
    // and existing documents that do not meet the criteria will be removed, off means that the validation will not be applied to any 
    // inserts or updates, and existing documents will not be affected.
})

