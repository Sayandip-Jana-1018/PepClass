db = db.getSiblingDB("mongoDB");

print("Database selected: " + db.getName());

db.dropDatabase();

print("Old database cleared");
