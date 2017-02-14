function htmlStringify (obj) {
  if (obj) {
    let checked = obj.status === true ? 'checked' : null
    var string =
      `<li>
      <input class="toggle" type="checkbox" onclick="edit(this)" ${checked} id=status${obj.id}>
      <input class="todo-text ${checked ? 'striked' : ''}"  type="text" value="${obj.description}" id=text${obj.id} readonly="true" ondblclick="enableText(this)" onfocusout="edit(this)" autocomplete="off">
      <button class="delete" onclick="destroy(this)" id=${obj.id}>X</button>
      </li>`
    checkFooterVisibility()
    return string
  }  else {
    checkFooterVisibility()
  }
}

// no need to make event listeners for DOM as its already in JS file refernced by script tag
