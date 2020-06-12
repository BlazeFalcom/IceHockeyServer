class Room {
    constructor(id, name, user1conn, user2conn) {
        this.id = id;
        this.name = name;
        this.user1conn = user1conn
        this.user2conn = user2conn
        this.state = false;
    }

}

module.exports = {
    Room
}