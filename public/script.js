function htmlStringify (obj) {
  // if (obj.status === true) {
    let checked = obj.status === true ? 'checked' : null
    var string = 
    `<li>
    <input type="checkbox" onclick="edit(this)" ${checked} id=status${obj.id}>
    <label class="${checked ? 'striked' : ''}">"${obj.description} "</label>
    <input class="todo-text-${checked ? 'striked' : ''}"  type="text" value=${obj.description} id=text${obj.id}>
    <button class="edit" onclick="edit(this)" id=${obj.id}>Edit</button>
    <button class="delete" onclick="destroy(this)" id=${obj.id}>Delete</button>
    </li>`
    return string
  }


document.getElementById("enterToDo").onkeydown = function (event) {
  if (event.keyCode === 13) {
  var todo = document.getElementById("enterToDo").value
  fetch(`/write/${todo}`, {
    method: "POST"
  }).then((response) => {
    response.json()
    .then((json) => {
      console.log(json.id)
      console.log(todos[0].description)
      console.log(todos[0].id)
      console.log(todos[0].status)      
    })
    .catch((response) => {
      console.log(response)
    })
    console.log(response)
    read()
  })
    .catch((response) => {
      console.log(response)
    });

}
}
function edit(element) {
  if (element.id.slice(0,6) === 'status') {
    var id = element.id.slice(6)
  }
  else {
    var id = element.id
  }
  var updateToDoText = document.getElementById(`text${id}`).value
  console.log(updateToDoText)
  var todoStatus = document.getElementById(`status${id}`).checked.toString()
  let data = {
    description: updateToDoText,
    status: todoStatus
  }
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
    read()
  })
    .catch((response) => {
      console.log(response)
    })
}

var todos=[]
const read = () => {fetch('/read', {
  method: 'get'
}).then(function (response) {
  response.json()
    .then((json) => {
      
      var row = "";
      // row1 = "";
      let count = 0
      json.forEach((obj) => {
        todos[count] = {id : obj.id,
                              status : obj.status,
                              description : obj.description}
        
        
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