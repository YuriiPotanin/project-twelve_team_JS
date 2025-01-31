import GetBooksFromApi from "./requests";
import Notiflix from "notiflix";
import { displayBookModal } from "./modal-window";

// LOADER ===================================================
const loader = document.querySelector('.loader-backdrop');

export function switchLoader() {
    loader?.classList.toggle('is-hidden');
}
// ============================================================

const booksList = document.querySelector('.book-block-list');

// FUNCTION FOR CREATE BOOK MARKUP
export function createBook(book) {
    return `<li class="book-card" id="${book._id}">
        <div class="book-card-box" data-book-info='${JSON.stringify(book)}'>
            <img class="book-card-img" src="${book.book_image}" alt="Book cover ${book.title}" loading="lazy" />
            <p class="book-card-overlay">quick view</p>
        </div>
        <h3 class="book-card-title">${book.title}</h3>
        <p class="book-card-text">${book.author}</p>
    </li>`;
}


// FUNCTION FOR CREATE MARKUP LIST OF BESTSELLERS
export function createBestBooksMarkup(books) {
const bestBooks = [];
  for (let i = 0; i < books.length; i += 1) {
   const cardMarkup = books[i].books.map((book, idx) => {
        if (idx < 5) {
            return createBook(book);
        }
    }).join('');
    const markupBests = `<h2 class="best-category-title">${books[i].list_name}</h2>
    <ul class="best-category-list">${cardMarkup}</ul>
    <div class="see-more-btn-box">
    <button class="see-more-btn" name="${books[i].list_name}" type="button">See more</button></div>`;

    bestBooks.push(markupBests);
}
// @ts-ignore
booksList.innerHTML = bestBooks.join('');
}
// =========================================================================================================
// CREATION MARKUP WHEN OPEN HOME PAGE

const getBooksFromApi = new GetBooksFromApi();
export async function onLoadPage() {
    switchLoader();
    try {
        const response = await getBooksFromApi.getBooks();
        if (response.length === 0) {
            Notiflix.Notify.warning('Sorry, there are no bestsellers books yet');
        }
        createBestBooksMarkup(response);

        // Add event listener for each book card box
        const bookCardBoxes = document.querySelectorAll('.book-card-box');
        bookCardBoxes.forEach((box) => {
            box.addEventListener('click', () => {
                // @ts-ignore
                const bookInfo = JSON.parse(box.dataset.bookInfo);
                displayBookModal(bookInfo);
            });
        });
    } catch (error) {
        Notiflix.Notify.failure('Something went wrong!');
    } finally {
        switchLoader();
    }
}
onLoadPage();
// ====================================================================================================
