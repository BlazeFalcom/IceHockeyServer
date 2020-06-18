class User {
    constructor(email, password, name, sex,loginIP,point = 0,is_online = "offline") {
        this.email = email;
        this.password = password;
        this.name = name;
        this.sex = sex;
        this.loginIP = loginIP;
        this.point = point;
        this.is_online = is_online;
    }
}

module.exports = {
    User
}


