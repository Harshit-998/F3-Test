const MyHistory = document.querySelector("#prev-searches");

MyHistory.addEventListener("click", () => {
  window.localStorage.href = "searches.html";
});

let OurForm = document.querySelector("form");
let OurInput = document.querySelector("input");
let OurResults = document.querySelector("#Searches");

OurForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchName = OurInput.value;
  let OurURL = encodeURIComponent(searchName);
  let url = `https://www.googleapis.com/books/v1/volumes?q=${OurURL}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      OurResults.innerHTML = `<h3>Showing Book Results For: '${searchName}'</h3>`;

      data.items.forEach((book) => {
        let BookTitle = book.volumeInfo.title;
        let BookAuthor = book.volumeInfo.authors
          ? book.volumeInfo.authors.join(", ")
          : "Unknown";
        let BookPage = book.volumeInfo.pageCount
          ? book.volumeInfo.pageCount
          : "Unknown";
        let BookPublisher = book.volumeInfo.publisher
          ? book.volumeInfo.publisher
          : "Unknown";
        let BookImage = book.volumeInfo.imageLinks
          ? book.volumeInfo.imageLinks.thumbnail
          : "https://via.placeholder.com/150x200";
        let BookLink = book.saleInfo.buyLink ? book.saleInfo.buyLink : "#";

        let BookItem = document.createElement("div");
        BookItem.classList.add("book");
        BookItem.innerHTML = `
                      <h3>${BookTitle}</h3>
                      <img src="${BookImage}" alt="${BookTitle} book cover">
                      <p>Author(s): ${BookAuthor}</p>
                      <p>Page count: ${BookPage}</p>
                      <p>Publisher: ${BookPublisher}</p>
                      <a href="${BookLink}" target="_blank"><button>Buy Now</button></a>
                  `;

        OurResults.appendChild(BookItem);
      });

      //  localStorage
      cacheData(searchName, data);
    })
    .catch((error) => {
      console.error(error);
    });
});

function cacheData(searchName, data) {
  const timestamp = new Date();
  let search = localStorage.getItem("bookSearches");
  search = search ? JSON.parse(search) : [];

  search.unshift([
    { searchName: searchName, timestamp: timestamp, data: data },
  ]);
  localStorage.setItem("bookSearches", JSON.stringify(search));
}
