var pool = require('./connection.js')

module.export.getAllMoveActions = async function() {
    try {
        let sql = `Select * from moveActions`;
        let result = await pool.query(sql);
        let cards = result.rows;

        return { status: 200, result: cards };
    } catch (err) {
        console.log(err);
        return { status: 500, result: err};
    }
}

module.export.getAllAttackActions = async function(){
    try {
        let sql = `Select * from attackAction`;
        let result = await pool.query(sql);
        let cards = result.rows;

        return{ status: 200, result: cards};
    } catch (err) {
        console.log(err);
        return { status: 500, result: err};
    }
}  