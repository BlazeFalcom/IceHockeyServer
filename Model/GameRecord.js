class GameRecord{
    constructor(gid, my_email, rival_email, winner, my_score, rival_score, time) {
        this.gid = gid;
        this.my_email = my_email;
        this.rival_email = rival_email;
        this.winner = winner;
        this.my_score = my_score;
        this.rival_score = rival_score;
        this.time = time;
    }
}

module.exports = {
    GameRecord
}