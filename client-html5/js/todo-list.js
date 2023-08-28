let style
let fontAwesome

function createLinkStyle() {
    if (style) return
    style = document.createElement("link")
    style.rel = "stylesheet"
    style.href = "./css/todo-list.css" // @REFATORAR

    if (fontAwesome) return
    fontAwesome = document.createElement("link")
    fontAwesome.rel = "stylesheet"
    fontAwesome.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"

    document.head.append(style, fontAwesome)
}

function createActionbar () {
    const actionBar = document.createElement("div")
    const input = document.createElement("input")
    const addButton = document.createElement("button")
    input.placeholder = "Adicione uma tarefa"
    addButton.textContent = "+"
    actionBar.append(input, addButton)
    actionBar.className = "action-bar"
    return { actionBar, input, addButton }
}

function createList () {
    const list = document.createElement("div")
    list.className = "list"
    return list
}

function createItem (labelText) {
    const item = document.createElement("div")
    const checkbox = document.createElement("input")
    const btDelete = document.createElement("button")
    const btEdit = document.createElement("button")
    const label = document.createElement("input")
    const iconDelete = document.createElement("i")
    const iconEdit = document.createElement("i")

    checkbox.type = "checkbox"
    checkbox.className = "checkbox"
    checkbox.addEventListener("change", () => {
        const label = item.querySelector(".item-label");
        if (checkbox.checked) {
            label.classList.add("completed"); 
        } else {
            label.classList.remove("completed");
        }
    });

    btDelete.append(iconDelete)
    iconDelete.className = "fa fa-trash"

    btEdit.className = "edit"
    btEdit.append(iconEdit)
    iconEdit.className = "fa fa-pencil"

    label.value = labelText
    label.textContent = labelText
    label.className = "item-label"
    label.setAttribute('readonly', 'readonly')
    label.type = 'text'

    item.append(checkbox, label, btEdit, btDelete)
    return { item, checkbox, label, btEdit, btDelete }
}

export default function(rootElement) {
    if (!(rootElement instanceof HTMLElement))
        return   
    
    createLinkStyle()
    const { actionBar, input, addButton } = createActionbar()
    const list = createList()
    rootElement.className = "gabriel-todo-list"
    rootElement.append(actionBar, list)

    const addNewItem = () => {
        if (input.value == "") 
            return

        const { item, btEdit, btDelete } = createItem(input.value)
        btDelete.addEventListener("click", () => item.remove())
        btEdit.addEventListener("click", (e) => editItem(item, btEdit))
        input.value = ""
        list.append(item)
    }
    /*
    function editItem(item, editButton) {
        const label = document.querySelector(".item-label");
        console.log(label)
        if (editButton.innerText.toLowerCase() == 'edit') {
            editButton.innerText = 'save';
            label.removeAttribute("readonly");
            label.focus();
        }
        else {
            editButton.innerText = 'edit';
            label.setAttribute('readonly', 'readonly');
        }
    }
    */

    function editItem(item, editButton) {
        
        const label = item.querySelector(".item-label");
        const originalText = label.textContent;
                
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = originalText;
        label.replaceWith(editInput);

        const saveButton = editButton;
        //saveButton.innerText = "save";
      
        saveButton.addEventListener("click", () => {
            const newText = editInput.value;
            if (newText.trim() !== "") {
                label.value = newText
                label.textContent = newText;
                //saveButton.innerText = "edit";
                editButton = saveButton;
            }
            editInput.replaceWith(label);
        });
        list.removeEventListener("click", saveButton);
    }

    // input.addEventListener("keydown", ({ key }) => key == "Enter" && addNewItem())

    input.addEventListener("keydown", (ev) => {
        if (ev.key == " " && input.value == "")
            return ev.preventDefault();
        if (ev.key == "Enter") addNewItem()
    })

    addButton.addEventListener("click", addNewItem)
        
}