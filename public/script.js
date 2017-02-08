// function whichButton(buttonElement) {
//   // alert(buttonElement.id);
//   var buttonClickedId = buttonElement.id;
//   if (buttonClickedId === 'btn1') {
//     var todo = document.getElementById("enterToDo").value
//     fetch(`/write/${todo}`, {
//       method: "POST"
//       // body: {task:todo}
//       // console.log(todo)
//     }).then((response) => {
//       console.log(response)
//     })
//       .catch((response) => {
//         console.log(response)
//       });
// 
//   }
//   else if (buttonClickedId === 'btn2') {
//     var deletetodo = document.getElementById("deleteLine").value
//     fetch(`/destroy/${deletetodo}`, {
//       method: "DELETE"
//       // body: {task:todo}
//       // console.log(todo)
//     }).then((response) => {
//       console.log(response)
//     })
//       .catch((response) => {
//         console.log(response)
//       });
//   }
//   // ...
//   else if (buttonClickedId === 'btn3') {
//     var updateToDoLine = document.getElementById("updateLine").value
//     var updateToDoText = document.getElementById("updateText").value
//     var updateToDoStatus = document.getElementById("updateStatus").value
//     let data = {
//       description: updateToDoText,
//       status: updateToDoStatus
//     }
//     fetch(`/update/${updateToDoLine}`, {
//       method: "PUT",
//       // body: {task:todo}
//       // console.log(todo)
//       body: JSON.stringify(data),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }).then((response) => {
//       console.log(response)
//     })
//       .catch((response) => {
//         console.log(response)
//       });
//   }

// }
function add(buttonElement) {
  var todo = document.getElementById("enterToDo").value
  fetch(`/write/${todo}`, {
    method: "POST"
    // body: {task:todo}
    // console.log(todo)
  }).then((response) => {
    console.log(response)
  })
    .catch((response) => {
      console.log(response)
    });

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
  })
    .catch((response) => {
      console.log(response)
    })
}

// function statusChange(checkboxElement) {

// }


fetch('/read', {
  method: 'get'
}).then(function (response) {
  response.json()
    .then((json) => {
      // console.log("running the render inside script.js")
      row = "";
      // row1 = "";
      let count = 0
      json.forEach((obj) => {
        count = count + 1
        // console.log(obj.status)
        // console.log(typeof obj.status)
        
        if (obj.status === true) {
        row = row + `<li><input type="checkbox" onclick="edit(this)" checked="true" id=status${obj.id}><label>"${obj.description} "</label><input type="text" id=text${obj.id}><button class="edit" onclick="edit(this)" id=${obj.id}>Edit</button><button class="delete" onclick="destroy(this)" id=${obj.id}>Delete</button></li>`
        }
        else if (obj.status === false) {
          row = row + `<li><input type="checkbox" onclick="edit(this)" id=status${obj.id}><label>"${obj.description} "</label><input type="text" id=text${obj.id}><button class="edit" onclick="edit(this)" id=${obj.id}>Edit</button><button class="delete" onclick="destroy(this)" id=${obj.id}>Delete</button></li>`
        }
        // row = row + "<li>" + "&nbsp" + obj.description + "&nbsp" + obj.status + "</li>"
        // row1 = row1 + `<option value=${count}>${count}</option>`
      })
      document.getElementById("this").innerHTML = row;
      // document.getElementById("updateLine").innerHTML = row1;
      // document.getElementById("deleteLine").innerHTML = row1;


    })

}).catch(function (err) {
});