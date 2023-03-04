// const MySearchHistory = JSON.parse(localStorage.getItem("bookSearches"));

// let historyList = document.getElementById("Searches");

// let count = 0;
// if (MySearchHistory) {
//   MySearchHistory.forEach((search) => {
//     count++;
//     const list = document.createElement("div");

//     let searchItem = search[0].searchItem;
//     let timestamp = new Date(search[0].timestamp);
//     let date = timestamp.toLocaleDateString();
//     let time = timestamp.toLocaleTimeString();

//     list.innerHTML = `
//         <div style="margin:10px">${count}.${searchItem} Searched On:${date} at ${timeStamp}</div>`;
//     list.addEventListener("click", () => {
//       booksOnShelf(list, search);
//     });
//     historyList.appendChild(list);
//   });
// } else {
//   historyList.innerHTML = "No Previous Searches";
// }

// const clearHistory = document.getElementById("prev-searches");
// clearHistory.addEventListener("click", () => {
//   localStorage.removeItem("bookSearches");
//   historyList.innerHTML = "Sorry, No Result Found";
// });

// function booksOnShelf(list, search) {
//   const FinalSearch = search[0].data.items;
//   FinalSearch.forEach((book) => {
//     const BookTitle = book.volumeInfo.title;
//     const BookAuthor = book.volumeInfo.authors
//       ? book.volumeInfo.authors.join(", ")
//       : "Unknown";
//     const BookPage = book.volumeInfo.pageCount
//       ? book.volumeInfo.pageCount
//       : "Unknown";
//     const BookPublisher = book.volumeInfo.publisher
//       ? book.volumeInfo.publisher
//       : "Unknown";
//     const BookImage = book.volumeInfo.imageLinks
//       ? book.volumeInfo.imageLinks.thumbnail
//       : "https://via.placeholder.com/128x196.png?text=No+Cover";
//     const BookLink = book.saleInfo.buyLink ? book.saleInfo.buyLink : "#";

//     const bookItem = document.createElement("div");
//     bookItem.style.display = "flex";
//     bookItem.style.flexWrap = "wrap";
//     bookItem.classList.add("bookItem");
//     bookItem.innerHTML = `
//             <div class="book">
//               <img src="${BookImage}" alt="${BookTitle}">
//               <h3>${BookTitle}</h3>
//               <p>Author(s): ${BookAuthor}</p>
//               <p>Publisher: ${BookPublisher}</p>
//               <p>Page Count: ${BookPage}</p>
//               <a href="${BookLink}" target="_blank" rel="noopener noreferrer" class="buy-button">Buy Now</a>
//             </div>
//           `;

//     list.appendChild(bookItem);
//   });
// }

const searchHistory = JSON.parse(localStorage.getItem("bookSearches"));

let searchHistoryList = document.getElementById("History");

let count = 0;
if (searchHistory) {
  searchHistory.forEach((search) => {
    count++;
    const li = document.createElement("div");

    let searchTerm = search[0].searchTerm;
    let timestamp = new Date(search[0].timestamp);
    let date = timestamp.toLocaleDateString();
    let time = timestamp.toLocaleTimeString();
    li.innerHTML = `<div style="border:1px solid black; margin:10px">${count}.${searchTerm}    Searched On:${date} at ${time}</div>`;
    li.addEventListener("click", () => {
      displayBookData(li, search);
    });
    searchHistoryList.appendChild(li);
  });
} else {
  searchHistoryList.innerHTML = "No Search Results";
}
const clearSearchButton = document.getElementById("Search");
clearSearchButton.addEventListener("click", () => {
  localStorage.removeItem("bookSearches");
  searchHistoryList.innerHTML = "No Search Result Found";
});

function displayBookData(li, search) {
  const searchResult = search[0].data.items;
  searchResult.forEach((book) => {
    const title = book.volumeInfo.title;
    const authors = book.volumeInfo.authors
      ? book.volumeInfo.authors.join(", ")
      : "Unknown";
    const publisher = book.volumeInfo.publisher
      ? book.volumeInfo.publisher
      : "Unknown";
    const pageCount = book.volumeInfo.pageCount
      ? book.volumeInfo.pageCount
      : "Unknown";
    const imageLink = book.volumeInfo.imageLinks
      ? book.volumeInfo.imageLinks.thumbnail
      : "https://via.placeholder.com/128x196.png?text=No+Cover";
    const buyLink = book.saleInfo.buyLink ? book.saleInfo.buyLink : "#";

    const bookDiv = document.createElement("div");
    bookDiv.style.display = "flex";
    bookDiv.style.flexWrap = "wrap";
    bookDiv.classList.add("bookDiv");
    bookDiv.innerHTML = `
        <div class="book">
          <img src="${imageLink}" alt="${title}">
          <h2>${title}</h2>
          <p>Author(s): ${authors}</p>
          <p>Publisher: ${publisher}</p>
          <p>Page Count: ${pageCount}</p>
          <a href="${buyLink}" target="_blank" rel="noopener noreferrer" class="buy-button">Buy Now</a>
        </div>
      `;

    li.appendChild(bookDiv);
  });
}
