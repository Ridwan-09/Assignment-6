const searchBook = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    // console.log(searchText);
    searchField.value = '';
    
    if(searchText === ''){
        const emptySearch = document.getElementById('empty-search');
        emptySearch.style.display = 'block';
        searchQuantity.style.display = 'none';

    }

    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data))
}

const displaySearchResult = data => {
    // console.log(data);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    const searchQuantity = document.getElementById('search-quantity');
    searchQuantity.innerText = `Showing total ${data.numFound} number of books`;

    if(data.numFound === 0){

    }

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

const loadBookDetail = book => {
    book?.cover_i ? (image_url =`https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg`) : (image_url = 'images/no-image.jpg');

    book?.title ? (title = book?.title) : (title = 'Not available');

    book?.author_name ? (author = book?.author_name) : (author = 'Not Available');
 
    book?.publisher[0] ? (publisher = book?.publisher[0]) : (publisher = 'Not Available');

    book?.publish_date[0] ? (publishedDate = book?.publish_date[0]) : (publishedDate = 'Not Available');
}