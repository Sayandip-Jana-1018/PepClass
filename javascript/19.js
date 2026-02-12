const products = [
    {id:1, name:"product1", description:"description1", price:1000},
    {id:2, name:"product2", description:"description2", price:2000},
    {id:3, name:"product3", description:"description3", price:3000},
    {id:4, name:"product4", description:"description4", price:4000},
    {id:5, name:"product5", description:"description5", price:5000}
]

const cart = products.map((product) => {
    const obj = {
        ...product, quantity: 1
    };
    // cart = [...cart, obj];
    return obj;
});
console.log(cart);