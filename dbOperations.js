let operations = require('./crudUsingPostgres.js')

const operationType = process.argv[2]

switch (operationType) {
  case 'read':
    {
      operations.read()
        .then((response) => {
          console.log(response[0])
        })
        .catch((response) => {
          console.log(response)
        })
    }
    break

  case 'insert':
    {
      let description = process.argv[3]
      operations.insert(description)
        .then((response) => {
          console.log(response[0])
        })
        .catch((response) => {
          console.log(response)
        })
    }
    break

  case 'destroy':
    {
      let taskToDelete = Number(process.argv[3])
      operations.destroy(taskToDelete)
        .then((response) => {
          console.log(response[0])
        })
        .catch((response) => {
          console.log(response)
        })
    }
    break

  case 'update':
    {
      let taskToDelete = Number(process.argv[3])
      let description = process.argv[4]
      operations.update(taskToDelete, description)
        .then((response) => {
          console.log(response[0])
        })
        .catch((response) => {
          console.log(response)
        })
    }
    break
}
