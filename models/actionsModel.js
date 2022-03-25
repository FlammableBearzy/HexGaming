var pool = require('./connection.js')

module.export.getAllActions = async function() {
    try {
        let sql = `Select * from actions`;
        let result = await pool.query(sql);
        let cards = result.rows;

        return { status: 200, result: cards };
    } catch (err) {
        console.log(err);
        return { status: 500, result: err};
    }
}