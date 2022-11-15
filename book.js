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

    data.docs.forEach(book => {
        console.log(doc)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card p-3">
            <img src="..." height="200px" class="card-img-top" alt="...">
            <div class="card-body">
                <p class="card-text"><b>Book Name:</b><i></i></p>
                <p class="card-text"><b>Autthor Name:</b><i></i></p>
                <p class="card-text"><b>Book Publisher</b><i></i></p>
                <p class="card-text"><b>Publishing Year</b><i></i></p>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}