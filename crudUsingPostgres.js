var Sequelize = require('sequelize')
var dbName = process.env.DEV_MODE === 'test' ? 'testdb' : 'vibhugulati'
var sequelize = new Sequelize
('postgres://vibhugulati:BL@CKB!RD1195@localhost:5432/' + dbName)


let operations = {
  insert: function (description, status = false) {
    let insertQuery = `INSERT INTO tasks (description,status) VALUES('${description}',${status}) returning id`
    return sequelize.query(insertQuery)
  },
  read: function () {
    let readQuery = `SELECT id, description, status FROM tasks ORDER BY id`
    return sequelize.query(readQuery)
  },
  checkAll: function () {
    let checkAllQuery = `UPDATE tasks SET status = true`
    return sequelize.query(checkAllQuery)
  },
  unCheckAll: function () {
    let unCheckAllQuery = `UPDATE tasks SET status = false`
    return sequelize.query(unCheckAllQuery)
  },
  destroyAllChecked: function (i) {
      let deleteQuery = `DELETE FROM tasks WHERE status = true`
      return sequelize.query(deleteQuery)
    },
  destroy: function (id) {
    let deleteQuery = `DELETE FROM tasks WHERE id = '${id}'`
    return sequelize.query(deleteQuery)
  },
  // resolve: function () {
  //   let resolveQuery = `SELECT id FROM tasks`
  //   return sequelize.query(resolveQuery)
  // },
  update: function (id, description, status = false) {
    if (!description) {
      return sequelize.query(`UPDATE TASKS SET STATUS = ${status} WHERE ID = ${id}`)
    }
    if (!status) {
      return sequelize.query(`UPDATE TASKS SET DESCRIPTION = '${description}' WHERE ID = ${id}`)
    }
    return sequelize.query(`UPDATE TASKS SET DESCRIPTION = '${description}', STATUS = ${status} WHERE ID = ${id}`)
    // check for replacements ...sql injection
    // description = `'; drop table tasks; --`
    // let updateQuery = `UPDATE tasks SET description = '${description}', status = ${status} WHERE id = '${id}'`
    // return sequelize.query(updateQuery)
  }
}


module.exports = operations
