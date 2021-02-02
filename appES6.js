class Book {
    constructor(title, author, isbn){
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

class UI {
    addBookToList(book){
        const list = document.getElementById('book-list')
        //create tr element:
        const row = document.createElement('tr')
        //insert cols
        row.innerHTML = `<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>
                        <td><a href="#" class="delete">X</a></td>`
        //append to the list
        list.appendChild(row)
    }

    showAlert(message, className){
        //create div
        const div = document.createElement('div')
        //add classes
        div.className = `alert ${className}`
        //create text node with a value of message
        div.appendChild(document.createTextNode(message))
        //get parent
        const container = document.querySelector('.container')
        const form = document.querySelector('#book-form')
        //insert alert into DOM
        container.insertBefore(div, form)
        //disappear after 3 seconds
        setTimeout(() => {
            document.querySelector('.alert').remove()
        },3000)
    }

    deleteItem(target){
        if(target.classList.contains('delete')){
            target.parentElement.parentElement.remove()

        }
    }
    clearFields(){
        document.getElementById('author').value = ""
        document.getElementById('title').value = ""
        document.getElementById('isbn').value = ""
    }
}



//=========================  EVENT LISTENERS  ==============================
//event listener for adding (submit)

document.getElementById('book-form').addEventListener('submit', (e) => {
    
    e.preventDefault()
    const author = document.getElementById('author').value,
          title = document.getElementById('title').value,
          isbn = document.getElementById('isbn').value

    //INSTANTIATE A BOOK
    const book = new Book(title, author, isbn)
    

    //INSTANTIATE UI OBJECT
    const ui = new UI()

    //validate
    if(title === '' || author === '' || isbn === ""){
        //show error
        ui.showAlert(`please fill in all fields`, `error`)

    } else {
        //show success
        ui.showAlert(`book added`, `success`)

        //add book to list
        ui.addBookToList(book)
        
        //clear fields
        ui.clearFields()
    }

    
})

//event listener for delete


    //get parent of deleted item
    document.getElementById('book-list').addEventListener('click', (e) => {

        
    //INSTANTIATE UI OBJECT
    const ui = new UI()
    ui.deleteItem(e.target)
    //show message
    ui.showAlert(`book successfully removed`, `success`)
    })
    
        

        