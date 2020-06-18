class LoginRecord{
    constructor(lid, email, login_time, logout_time) {
        this.lid = lid;
        this.email = email;
        this.login_time = login_time;
        this.logout_time = logout_time;
    }
}

module.exports = {
    LoginRecord
}