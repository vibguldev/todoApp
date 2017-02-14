function readFetch () {
  return fetch('/read', {
    method: 'get'
  })
}

function writeFetch (todo) {
  return fetch(`/write/${todo}`, {
      method: 'POST'
    })
}

function destroyFetch (buttonClickedId) {
  return fetch(`/destroy/${buttonClickedId}`, {
    method: "DELETE"
  })
}

function updateFetch (data, todoId) {
  return fetch(`/update/${todoId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

function toggleAllFetch (operation) {
  return fetch(operation, {
      method: 'PUT'
    })
}

function destroyAllFetch () {
  return fetch(`/destroyAllChecked`, {
    method: "DELETE"
  })
}