let filterModeFlag
function htmlStringify(obj) {
  // if (obj.status === true) {
  let checked = obj.status === true ? 'checked' : null
  var string =
    `<li>
    <input type="checkbox" onclick="edit(this)" ${checked} id=status${obj.id}>
    <input class="todo-text-${checked ? 'striked' : ''}"  type="text" value="${obj.description}" id=text${obj.id} readonly="true" ondblclick="enableText(this)" onfocusout="edit(this)">
    
    <button class="delete" onclick="destroy(this)" id=${obj.id}>❌</button>
    </li>`
  return string
}

function enableText(obj) {
  obj.readOnly = ""
}

function checkFilterModeFlag() {
  console.log("flag : ",filterModeFlag)
  if (filterModeFlag === 0) {
    filterTodos('all')
  }
  else if (filterModeFlag === 1) {
    filterTodos('active')
  }
  else if (filterModeFlag === 2) {
    filterTodos('completed')
  }
}


function checkAll() {
  if (todos.every((todo) => (todo.status === true))) {
    fetch(`/unCheckAll`, {
      method: "PUT"
    }).then((response) => {
      console.log(response)
      document.getElementById("this").innerHTML = null
      todos.forEach((todo) => {
        todo.status = false
        document.getElementById("this").innerHTML += htmlStringify(todo)

      })
      document.getElementById("number-of-todos").innerHTML = todos.filter((todo) => (todo.status === false)).length

    })
  }
  else {
    fetch(`/checkAll`, {
      method: "PUT"
    }).then((response) => {
      console.log(response)
      document.getElementById("this").innerHTML = null
      todos.forEach((todo) => {
        todo.status = true
        document.getElementById("this").innerHTML += htmlStringify(todo)
      })
      document.getElementById("number-of-todos").innerHTML = todos.filter((todo) => (todo.status === false)).length

    })
  }
}

// <button class="edit" onclick="edit(this)" id=${obj.id}>Edit</button>
// <label class="${checked ? 'striked' : ''}">"${obj.description} "</label>
document.getElementById("enterToDo").onkeydown = function (event) {
  if (event.keyCode === 13) {
    var todo = document.getElementById("enterToDo").value
    fetch(`/write/${todo}`, {
      method: "POST"
    }).then((response) => {
      response.json()
        .then((json) => {
          console.log(json.id)
          const length = todos.length
          todos[length] = {
            id: json.id,
            status: false,
            description: todo
          }
          // document.getElementById("this").innerHTML += htmlStringify(todos[length])
          checkFilterModeFlag()
          document.getElementById("number-of-todos").innerHTML = todos.filter((todo) => (todo.status === false)).length

        })
        .catch((response) => {
          console.log(response)
        })
      console.log(response)
      // read()
    })
      .catch((response) => {
        console.log(response)
      });
    document.getElementById("enterToDo").value = null
    // let row = ''
    // todos.forEach((todo) => {
    //   row = row + htmlStringify(todo)
    // })

  }
}
function edit(element) {
  var data
  var statusFlag = false
  var descriptionFlag = false
  if (element.id.slice(0, 6) === 'status') {
    var todoId = element.id.slice(6)
    var todoStatus = document.getElementById(`status${todoId}`).checked.toString()
    data = {
      status: todoStatus
    }
    statusFlag = true
  }
  else {
    var todoId = element.id.slice(4)
    var updateToDoText = document.getElementById(`text${todoId}`).value
    data = {
      description: updateToDoText
    }
    descriptionFlag = true
  }
  // console.log(updateToDoText)


  fetch(`/update/${todoId}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    console.log(response)
    let index = todos.findIndex(x => x.id === todoId)
    if (descriptionFlag) {
      todos[index].description = updateToDoText
    }
    else if (statusFlag) {
      todoStatus = todoStatus === 'true'
      todos[index].status = todoStatus
    }
    document.getElementById("this").innerHTML = null
    // todos.forEach((todo) => {
    //   document.getElementById("this").innerHTML += htmlStringify(todo)
    // })
    checkFilterModeFlag()
    document.getElementById("number-of-todos").innerHTML = todos.filter((todo) => (todo.status === false)).length

  })
    .catch((response) => {
      console.log(response)
    })
}

function filterTodos(filterMode) {
  document.getElementById("this").innerHTML = null
  switch (filterMode) {
    case 'all': {
      filterModeFlag = 0
      todos.forEach((todo) => {
        document.getElementById("this").innerHTML += htmlStringify(todo)
      })
    }
      break
    case 'active': {
      filterModeFlag = 1
      todos.forEach((todo) => {
        if (todo.status === false) {
          document.getElementById("this").innerHTML += htmlStringify(todo)
        }
      })
    }
      break
    case 'completed': {
      filterModeFlag = 2
      todos.forEach((todo) => {
        if (todo.status === true) {
          document.getElementById("this").innerHTML += htmlStringify(todo)
        }
      })
    }
      break
    default:
      console.log("erronous filter mode")
      break

  }
}

////////resolve this function >>>>>>>>><<<<<<<<<>>>>>>><<<#$^#^#^#%#%&#%#%^#^#$^#$%@#%@%#$&%^*%*^&*%^&$%&#^#$^#^$#&$^&%^&*$&$&#%^#$^@$%@$%@$%
function destroyAllChecked() {
  fetch(`/destroyAllChecked`, {
    method: "DELETE"
  }).then((response) => {
    console.log("response:.........", response)
    document.getElementById("this").innerHTML = null
    var newTodos = []
    todos.forEach((todo, index) => {
      if (todo.status === false) {
        // todos.splice(index, 1)
        newTodos.push(todo)
        console.log("here")
      }
    })
    todos = newTodos
      // console.log(todos)
      // todos.forEach ((todo) => {
      //   document.getElementById("this").innerHTML += htmlStringify(todo)
      // })
      checkFilterModeFlag()
      document.getElementById("number-of-todos").innerHTML = todos.filter((todo) => (todo.status === false)).length
    })
    
    .catch((response) => {
      console.log(response)
    })
}

function destroy(buttonElement) {
  var buttonClickedId = buttonElement.id
  fetch(`/destroy/${buttonClickedId}`, {
    method: "DELETE"
  }).then((response) => {
    console.log(response)
    // read()
    let index = todos.findIndex(x => x.id === buttonClickedId)
    todos.splice(index, 1)
    document.getElementById("this").innerHTML = null
    todos.forEach((todo) => {
      document.getElementById("this").innerHTML += htmlStringify(todo)
    })
    document.getElementById("number-of-todos").innerHTML = todos.filter((todo) => (todo.status === false)).length
  })
    .catch((response) => {
      console.log(response)
    })


}

var todos = []
const read = () => {
  fetch('/read', {
    method: 'get'
  }).then(function (response) {
    filterModeFlag = 1
    response.json()
      .then((json) => {

        var row = "";
        // row1 = "";
        let count = 0
        json.forEach((obj) => {
          todos[count] = {
            id: obj.id,
            status: obj.status,
            description: obj.description
          }
          var domString = htmlStringify(todos[count])
          row = row + domString
          count = count + 1
        })
        document.getElementById("this").innerHTML = row;
        document.getElementById("number-of-todos").innerHTML = todos.filter((todo) => (todo.status === false)).length


      })

  }).catch(function (err) {
  })
}
read()