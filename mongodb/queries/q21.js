// Using regex function in mogodb

db.employees.find({
    name: { $regex: "Smith" }
}) // This query will also return all employees whose name contains "Smith" anywhere in the string.

db.employees.find({
    name: { $regex: "^Smith" }
}) // This query will return all employees whose name starts with "Smith".

db.employees.find({
    name: { $regex: "Smith$" }
}) // This query will return all employees whose name ends with "Smith".

db.employees.find({
    name: { $regex: "^Smith$" }
}) // This query will return all employees whose name is exactly "Smith".

db.employees.find({
    name: { $regex: "Smith", $options: "i" }
}) // This query will return all employees whose name contains "Smith" in a case-insensitive manner.

