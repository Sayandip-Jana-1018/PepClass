let cart = []
//Click on add to cart button on iphone product
cart = [...cart,{name:"iphone",price:45000,qty:1}]
// console.log(cart)
//Click on add to cart button on speaker product
cart = [...cart,{name:"speaker",price:1000,qty:1}]
console.log(cart)

const order = {
    email:"john@gmail.com",
    items:cart,
    orderValue:46000,
    status:"pending"
}
db.orders.insertOne(order)

// MongoDB shell commands for Flipcart database setup and queries

// 1. Create flipcart database (in Mongo shell, use:)
// use flipcart

// 2. Create collections (MongoDB creates collections on first insert)
// orders: email, items, orderValue, status, orderDate
// users: name, email, password, role

// 3. Insert seed data
db.users.insertMany([
    { name: "John Doe", email: "john@gmail.com", password: "john123", role: "customer" },
    { name: "Jane Smith", email: "jane@gmail.com", password: "jane123", role: "customer" },
    { name: "Admin User", email: "admin@flipcart.com", password: "admin123", role: "admin" }
])

db.orders.insertMany([
    {
        email: "john@gmail.com",
        items: [
            { name: "iphone", price: 45000, qty: 1 },
            { name: "speaker", price: 1000, qty: 1 }
        ],
        orderValue: 46000,
        status: "pending",
        orderDate: new Date("2024-02-01T10:00:00Z")
    },
    {
        email: "jane@gmail.com",
        items: [
            { name: "laptop", price: 60000, qty: 1 }
        ],
        orderValue: 60000,
        status: "shipped",
        orderDate: new Date("2024-02-02T12:00:00Z")
    }
])

// 4. Aggregate query to display all orders placed by a particular user (e.g., john@gmail.com)
db.orders.aggregate([
    { $match: { email: "john@gmail.com" } },
    {
        $project: {
            _id: 0,
            email: 1,
            items: 1,
            orderValue: 1,
            status: 1,
            orderDate: 1
        }
    }
])