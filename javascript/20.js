const products = [
    {id:1, name:"product1", description:"description1", price:1000, category:"electronics"},
    {id:2, name:"product2", description:"description2", price:2000, category:"clothing"},
    {id:3, name:"product3", description:"description3", price:3000, category:"books"},
    {id:4, name:"product4", description:"description4", price:4000, category:"home"},
    {id:5, name:"product5", description:"description5", price:5000, category:"sports"},
    {id:6, name:"product6", description:"description6", price:6000, category:"beauty"},
]


let search = "home"

const resultArray = products.map(product => {
    if(product.category === search){
        return product
    }
}).filter(product => product !== undefined)

console.log(resultArray)