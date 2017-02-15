let entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '\/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
  '\\': '&#92;'
}
function escapeHtml(string) {
  console.log("heeeelooooooooooooooooooo")
  return String(string).replace(/[&<>"'`=\/\\]/g, function (s) {
    return entityMap[s]
  })
}

function readFetch () {
  return fetch('/read', {
    method: 'get'
  })
}

function writeFetch (todo) {
  if (todo) {
  return fetch(`/write/${todo}`, {
      method: 'POST'
    })
  }
  else {
    return 'no description passed'
  }
}

function destroyFetch (buttonClickedId) {
  return fetch(`/destroy/${buttonClickedId}`, {
    method: "DELETE"
  })
}

function updateFetch (data, todoId) {
  if ((data.description !== undefined) || (data.status !== undefined)) {
  return fetch(`/update/${todoId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  }
  else {
    return "neither description nor status was passed"
  }
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