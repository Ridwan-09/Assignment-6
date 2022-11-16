// Calling all id
const searchField = document.getElementById("search-field");
const searchResult = document.getElementById('search-result');
const searchQuantity = document.getElementById('search-quantity');
const errorSearch = document.getElementById('error');
const emptySearch = document.getElementById('empty-search');

// function calling tp search books
const searchBook = () => {
    const searchText = searchField.value;
    // console.log(searchText);

    // clearing data
    searchField.value = '';
    searchQuantity.innerText = '';
    searchResult.textContent = '';
    
    // error handling for empty search
    if(searchText === ''){
        emptySearch.style.display = 'block';
        errorSearch.style.display = 'none';
    }
    else{
        emptySearch.style.display = 'none';

        // book API url
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data))
    }
};

// function to display search results
const displaySearchResult = data => {
    // console.log(data);

    // showing total number of books
    searchQuantity.innerText = `Showing total ${data.numFound} number of books`;

    // error handling for unavailable books
    if(data.numFound === 0){
        searchQuantity.innerText = '';
        errorSearch.style.display = 'block';
        emptySearch.style.display = 'none';
    }
    else{
        errorSearch.style.display = 'none';

        // looping
        data?.docs.forEach((book) => {
            // console.log(doc)
            
            // calling function
            loadBookDetail(book);
            
            // displaying book details
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card">
            <img src="${image_url}" height="300px" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title"><b>Book Name:</b><i> ${title}</i></h5>
              <p class="card-text"><b>Author Name:</b><i> ${author}</i></p>
              <p class="card-text"><b>Book Publisher:</b><i> ${publisher}</i></p>
              <p class="card-text"><b>Published Date:</b><i> ${publishedDate}</i></p>
            </div>
        </div>
            `;
            searchResult.appendChild(div);
        });
    }    
}

// function loading book details
const loadBookDetail = book => {

    // loading book image if available
    book?.cover_i ? (image_url =`https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg`) : (image_url = 'images/no-image.jpg');

    // loading book title if available
    book?.title ? (title = book?.title) : (title = 'Not available');

    // loading book author name if available
    book?.author_name ? (author = book?.author_name) : (author = 'Not Available');
    
    // loading book publisher name if available
    book?.publisher[0] ? (publisher = book?.publisher[0]) : (publisher = 'Not Available');

    // loading book publish date if available
    book?.publish_date[0] ? (publishedDate = book?.publish_date[0]) : (publishedDate = 'Not Available');
}