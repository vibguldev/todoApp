var Sequelize = require('sequelize')
var sequelize = new Sequelize('postgres://vibhugulati:BL@CKB!RD1195@localhost:5432/vibhugulati')

// const description = "buy food"
// const stat = false

let operations = {
  insert: function (description, status = false) {
    let insertQuery = `INSERT INTO tasks (description,status) VALUES('${description}',${status})`
    return sequelize.query(insertQuery)
  },
  read: function () {
    let readQuery = `SELECT * FROM tasks`
    return sequelize.query(readQuery)
  },
  destroy: function (id) {
    let deleteQuery = `DELETE FROM tasks WHERE id = '${id}'`
    return sequelize.query(deleteQuery)
  },
  update: function (id, description, status = false) {
    let updateQuery = `UPDATE tasks SET description = '${description}', status = ${status} WHERE id = '${id}'`
    return sequelize.query(updateQuery)
  }
}


module.exports = operations
