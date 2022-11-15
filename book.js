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

    data.docs.forEach(doc => {
        console.log(doc)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        
        `;
        searchResult.appendChild(div);
    })
}