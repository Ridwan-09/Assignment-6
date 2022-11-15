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

const displaySearchResult = books => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('card');
    })
}