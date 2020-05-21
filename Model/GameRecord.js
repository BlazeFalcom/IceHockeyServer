class GameRecord{
    constructor(uid, rival_id, winner, uscore, rival_score, time) {
        this.uid = uid;
        this.rival_id = rival_id;
        this.winner = winner;
        this.uscore = uscore;
        this.rival_score = rival_score;
        this.time = time;
    }
}

module.exports = {
    GameRecord
}