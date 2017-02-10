function htmlStringify(obj) {
  // if (obj.status === true) {
  let checked = obj.status === true ? 'checked' : null
  var string =
    `<li>
    <input type="checkbox" onclick="edit(this)" ${checked} id=status${obj.id}>
    <input class="todo-text-${checked ? 'striked' : ''}"  type="text" value="${obj.description}" id=text${obj.id}>
    <button class="edit" onclick="edit(this)" id=${obj.id}>Edit</button>
    <button class="delete" onclick="destroy(this)" id=${obj.id}>Delete</button>
    </li>`
  return string
}
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
          document.getElementById("this").innerHTML += htmlStringify(todos[length])
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
  if (element.id.slice(0, 6) === 'status') {
    var id = element.id.slice(6)
    var todoStatus = document.getElementById(`status${id}`).checked.toString()
    data = {
      status: todoStatus
    }


  }
  else {
    var id = element.id
    var updateToDoText = document.getElementById(`text${id}`).value
    data = {
      description: updateToDoText,
    }


  }
  // console.log(updateToDoText)

  fetch(`/update/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    console.log(response)
    read()
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

      })

  }).catch(function (err) {
  })
}
read()