class User {
    constructor(uid, email, password, name, score) {
        this.uid = uid;
        this.email = email;
        this.password = password;
        this.name = name;
        this.score = score;
    }
}

module.exports = {
    User
}

var a = new User(1,2,3,4,5);
var b = JSON.stringify(a);
var c = JSON.parse(b);
console.log(a,b,c);

