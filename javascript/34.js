// function response(user) {
//     console.log(user.name)
//     console.log(user.email)
// }
// const uer = {
//     name:"John",
//     email:"john@gmail.com",
//     role:"user",
// };
// response(user)

function response({name, email, role}) {
    console.log(name)
    console.log(email)
}
const user = {
    name:"John",
    email:"john@gmail.com",
    role:"user",
};
response(user)