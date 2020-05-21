var db = require('./DBUtil');
db.connect();

db.executeUpdate("update account set pwd = ? where c_id = ?", ['654321', '100005'], function(result){
    console.log(result);
})
