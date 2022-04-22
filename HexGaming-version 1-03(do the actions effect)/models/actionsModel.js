var pool = require('./connection.js')

module.exports.getAllMoveActions = async function() {
    try {
        let sql = `Select * from moveAction`;
        let result = await pool.query(sql);
        let moveAction = result.rows;

        return { status: 200, result: moveAction };
    } catch (err) {
        console.log(err);
        return { status: 500, result: err};
    }
};

module.exports.getAllAttackActions = async function(){
    try {
        let sql = `Select att_action_id,att_action_name,att_action_cooldown from attackAction`;
        let result = await pool.query(sql);
        let attackAction = result.rows;

        return{ status: 200, result: attackAction };
    } catch (err) {
        console.log(err);
        return { status: 500, result: err};
    }
}; 