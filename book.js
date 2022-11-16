const searchBook = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    // console.log(searchText);
    searchField.value = '';

    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data))
}

const displaySearchResult = data => {
    console.log(data);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    data?.docs.forEach(book => {
        // console.log(doc)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
    <div class="card" style="width: 18rem;">
        <img src="..." height="300px" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title"><b>Book Name:</b><i></i></h5>
          <p class="card-text"><b>Author Name:</b><i></i></p>
          <p class="card-text"><b>Book Publisher:</b><i></i></p>
          <p class="card-text"><b>Published Date:</b><i></i></p>
        </div>
    </div>
        `;
        searchResult.appendChild(div);
    })
}