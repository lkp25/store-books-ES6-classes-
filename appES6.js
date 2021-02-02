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
class Store{
    static getBooks(){
        let books //simply returns an array of books in LS
        if(localStorage.getItem(`books`) === null ){
            books = []
        } else {
            books = JSON.parse(localStorage.getItem(`books`) )
        }
        return books
    }
    static displayBooks(){
        //get books first method from this object
        let books = Store.getBooks()
        //for each array element use a method from UI to display it 
        //by INSTANTIATING the UI first! and pass each book as argument
        books.forEach((book) => {
            const ui = new UI
            ui.addBookToList(book)
            //this still needs to be called after DOM is LOADED - event written below
        })
    }
    static addBook(book){
        const books = Store.getBooks()
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))
        
    }
    static removeBook(isbn){
        //get books from LS first
        const books = Store.getBooks()
        books.forEach((book, index) => {
            //check if currently iterated book's isbn is equal to clicked target's isbn 
            if(book.isbn === isbn){
                //if it is, than cut it from the array using its index
                books.splice(index, 1)
                
            }
            //and push all the rest back to LS
            localStorage.setItem('books', JSON.stringify(books))
        })
    }
}

document.addEventListener('DOMContentLoaded', Store.displayBooks) //static method

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
        
        //add to LS
        Store.addBook(book)
        //clear fields
        ui.clearFields()
    }

    
})

//event listener for delete


    //get parent of deleted item
    document.getElementById('book-list').addEventListener('click', (e) => {

        
    //INSTANTIATE UI OBJECT
    const ui = new UI()
    //delete the book
    ui.deleteItem(e.target)

    //delete from Local Storage as well

    //we need a uniqe value to hold onto, so we can for example get the ISBN number.
    //e.target is X icon, its parent is <td>, and the previous sibling of this td 
    //is another td with ISBN number inside - we grab it and pass as argument
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    //show message
    ui.showAlert(`book successfully removed`, `success`)
    })
    
        

        