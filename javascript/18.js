// const products = ["product1", "product2", "product3", "product4", "product5"];

const products = [
    {id:1, name:"product1", description:"description1", price:1000},
    {id:2, name:"product2", description:"description2", price:2000},
    {id:3, name:"product3", description:"description3", price:3000},
    {id:4, name:"product4", description:"description4", price:4000},
    {id:5, name:"product5", description:"description5", price:5000}
]

// products.forEach((product) => console.log(product));

const cart = []
// Push all ement of products array to cart array and add two keys qty and total qty*price
products.forEach((product) => cart.push({...product, qty:1, total: product.price*product.qty}))
console.log(cart)
