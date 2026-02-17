function user() {
    let password = "1234"
    function checkPassword(inputPassword) {
        return password === inputPassword;
    }
    return checkPassword;
}

const checkPassword = user()
console.log(checkPassword("123"))