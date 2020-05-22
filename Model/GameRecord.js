class GameRecord{
    constructor(gid, our, rival, winner, uscore, rival_score, time) {
        this.gid = gid;
        this.our = our;
        this.rival = rival;
        this.winner = winner;
        this.uscore = uscore;
        this.rival_score = rival_score;
        this.time = time;
    }
}

module.exports = {
    GameRecord
}