const searchField = document.getElementById("search-field");
const searchResult = document.getElementById('search-result');
const searchQuantity = document.getElementById('search-quantity');
const errorSearch = document.getElementById('error');
const emptySearch = document.getElementById('empty-search');

const searchBook = () => {
    
    const searchText = searchField.value;
    // console.log(searchText);
    searchField.value = '';
    searchQuantity.innerText = '';
    searchResult.textContent = '';
    
    // error handling for empty search
    if(searchText === ''){
        const emptySearch = document.getElementById('empty-search');
        emptySearch.style.display = 'block';
        errorSearch.style.display = 'none';
        searchQuantity.style.display = 'none';
    }
    else{
        emptySearch.style.display = 'none';
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data))
    }
};

const displaySearchResult = data => {
    // console.log(data);
    
    

    
    searchQuantity.innerText = `Showing total ${data.numFound} number of books`;

    // error handling for unavailable books
    if(data.numFound === 0){
        
        errorSearch.style.display = 'block';
        emptySearch.style.display = 'none';
    }
    else{
        errorSearch.style.display = 'none';

        data?.docs.forEach((book) => {
            // console.log(doc)
    
            loadBookDetail(book);
    
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

const loadBookDetail = book => {
    book?.cover_i ? (image_url =`https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg`) : (image_url = 'images/no-image.jpg');

    book?.title ? (title = book?.title) : (title = 'Not available');

    book?.author_name ? (author = book?.author_name) : (author = 'Not Available');
 
    book?.publisher[0] ? (publisher = book?.publisher[0]) : (publisher = 'Not Available');

    book?.publish_date[0] ? (publishedDate = book?.publish_date[0]) : (publishedDate = 'Not Available');
}