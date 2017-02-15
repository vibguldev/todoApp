let filterModeFlag

document.getElementById('loading').onload = read()
document.getElementById('check-all').addEventListener('click', checkAll)
document.getElementById('all').addEventListener('click', () => {
  filterTodos('all')
})
document.getElementById('active').addEventListener('click', () => {
  filterTodos('active')
})
document.getElementById('completed').addEventListener('click', () => {
  filterTodos('completed')
})
document.getElementById('clear-completed').addEventListener('click', destroyAllChecked)

function checkFooterVisibility () {
  document.getElementById('filter-footer').style.display = (todos.length > 0) ? 'block' : 'none'
}

function enableText (obj) {
  obj.readOnly = ''
  const deleteButtonID = obj.id.slice(4)
  const checkBoxID = 'status' + obj.id.slice(4)
  document.getElementById(obj.id).className = 'edit'
  document.getElementById(deleteButtonID).style.visibility = 'hidden'
  document.getElementById(checkBoxID).style.visibility = 'hidden'
}

function checkFilterModeFlag () {
  if (filterModeFlag === 0) {
    filterTodos('all')
  } else if (filterModeFlag === 1) {
    filterTodos('active')
  } else if (filterModeFlag === 2) {
    filterTodos('completed')
  }
}

function checkAll () {
  if (todos.every((todo) => (todo.status === true))) {
    toggleAllFetch(`/unCheckAll`).then((response) => {
      console.log(response)
      document.getElementById('this').innerHTML = null
      todos.forEach((todo) => {
        todo.status = false
      })
      checkFilterModeFlag()
      document.getElementById('number-of-todos').innerHTML = todos.filter((todo) => (todo.status === false)).length
    })
  } else {
    toggleAllFetch(`/checkAll`).then((response) => {
      console.log(response)
      document.getElementById('this').innerHTML = null
      todos.forEach((todo) => {
        todo.status = true
        // document.getElementById("this").innerHTML += htmlStringify(todo)
      })
      checkFilterModeFlag()
      document.getElementById('number-of-todos').innerHTML = todos.filter((todo) => (todo.status === false)).length
    })
  }
}

// <button class="edit" onclick="edit(this)" id=${obj.id}>Edit</button>
// <label class="${checked ? 'striked' : ''}">"${obj.description} "</label>
document.getElementById('enterToDo').onkeydown = function (event) {
  if (event.keyCode === 13) {
    var todo = escapeHtml(document.getElementById('enterToDo').value)
    writeFetch(todo).then((response) => {
      response.json()
        .then((json) => {
          console.log(json.id)
          const length = todos.length
          todos[length] = {
            id: json.id,
            status: false,
            description: todo
          }
          checkFilterModeFlag()
          document.getElementById('number-of-todos').innerHTML = todos.filter((todo) => (todo.status === false)).length
        })
        .catch((response) => {
          console.log(response)
        })
    })
      .catch((response) => {
        console.log(response)
      })
    document.getElementById('enterToDo').value = null
  }
}
function edit (element) {
  var data
  var statusFlag = false
  var descriptionFlag = false
  if (element.id.slice(0, 6) === 'status') {
    var todoId = element.id.slice(6)
    var todoStatus = document.getElementById(`status${todoId}`).checked.toString()
    data = {status: todoStatus}
    statusFlag = true
  } else {
    var todoId = element.id.slice(4)
    var updateToDoText = escapeHtml(document.getElementById(`text${todoId}`).value)
    data = {description: updateToDoText}
    descriptionFlag = true
  }
  updateFetch(data, todoId)
  .then((response) => {
    let index = todos.findIndex(x => x.id === todoId)
    if (descriptionFlag) {
      todos[index].description = updateToDoText
    } else if (statusFlag) {
      todoStatus = todoStatus === 'true'
      todos[index].status = todoStatus
    }
    document.getElementById('this').innerHTML = null
    checkFilterModeFlag()
    document.getElementById('number-of-todos').innerHTML = todos.filter((todo) => (todo.status === false)).length
  })
    .catch((response) => {
      console.log(response)
    })
}

function filterTodos (filterMode) {
  document.getElementById(filterMode).className = 'selected-filters'
  document.getElementById('this').innerHTML = null
  switch (filterMode) {
    case 'all': {
      filterModeFlag = 0
      todos.forEach((todo) => {
        document.getElementById("this").innerHTML += htmlStringify(todo)
      })
      document.getElementById("all").className = "filters selected"
      document.getElementById("active").className = "filters"
      document.getElementById("completed").className = "filters"
            
    }
      break
    case 'active': {
      filterModeFlag = 1
      todos.forEach((todo) => {
        if (todo.status === false) {
          document.getElementById("this").innerHTML += htmlStringify(todo)
        }
      })
      document.getElementById("active").className = "filters selected"
      document.getElementById("all").className = "filters"
      document.getElementById("completed").className = "filters" 
    }
      break
    case 'completed': {
      filterModeFlag = 2
      todos.forEach((todo) => {
        if (todo.status === true) {
          document.getElementById("this").innerHTML += htmlStringify(todo)
        }
      })
      document.getElementById("completed").className = "filters selected"
      document.getElementById("active").className = "filters"
      document.getElementById("all").className = "filters"      
    }
      break
    default:
      console.log("erronous filter mode")
      break

  }
}

function destroyAllChecked() {
  destroyAllFetch().then((response) => {
    document.getElementById("this").innerHTML = null
    var newTodos = []  //a dummy array created to avoid the issue of splice
    todos.forEach((todo, index) => {
      if (todo.status === false) {
        newTodos.push(todo)
      }
    })
    todos = newTodos
      checkFooterVisibility()
      checkFilterModeFlag()
      document.getElementById("number-of-todos").innerHTML = todos.filter((todo) => (todo.status === false)).length
    })
    .catch((response) => {
      console.log(response)
    })
}

function destroy(buttonElement) {
  var buttonClickedId = buttonElement.id
  destroyFetch(buttonClickedId).then((response) => {
    let index = todos.findIndex(x => x.id === buttonClickedId)
    todos.splice(index, 1)
    document.getElementById("this").innerHTML = null
    checkFooterVisibility()
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
function read() {
  readFetch().then(function (response) {
    filterModeFlag = 0
    response.json()
      .then((json) => {
        console.log(json)
        console.log(json instanceof Array)
        var row = ""
        let count = 0
        json.forEach((obj) => {
          todos[count] = {
            id: obj.id,
            status: obj.status,
            description: obj.description
          }
          console.log("here")
          var domString = htmlStringify(todos[count])
          row = row + domString
          count = count + 1
        })
        document.getElementById("this").innerHTML = row;
        document.getElementById("number-of-todos").innerHTML = todos.filter((todo) => (todo.status === false)).length
      })
  .then((response) => {
    console.log("inner catch")
    console.log(todos.length)
    htmlStringify()
  })
  }).catch((err) => {
    console.log("outer catch")
  })
}
