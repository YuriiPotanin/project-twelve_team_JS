export function displayBookModal(book) {
    const modal = document.getElementById('bookModal');
    // Clear previous content
    modal.innerHTML = '';

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContent.innerHTML = `
    <button id="closeModal">
    <svg width="24" height="24">
    <use href="./img/InlineSprite.svg#x-close"></use>
    </svg>
  </button>

  <div class="book-modal-info">
    <img class="book-modal-img" src="${book.book_image}" alt="Book cover for ${book.title}" loading="lazy" />
    
    <div>
      <h3 class="book-modal-title">${book.title}</h3>
      <p class="book-modal-author">${book.author}</p>
      <p class="book-modal-description">${book.description}</p>
      
      <div class="book-link-wrap">
        <a href="${book.buy_links[0].url}" target="_blank" class="book-link">
          <img src="./img/amazon@1x-min.png" srcset="./img/amazon@2x-min.png 2x" alt="Amazon link">
        </a>
        
        <a href="${book.buy_links[1].url}" target="_blank" class="book-link">
          <img src="./img/appleBook@1x-min.png" srcset="./img/appleBook@2x-min.png 2x" alt="Apple Book link">
        </a>
      </div>
    </div>
  </div>

  <button id="addToShoppingList">Add to Shopping List</button>

  <p id="congratulationsMessage" style="display: none;">
    Congratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”.
  </p>
    `;

    modal.appendChild(modalContent);

    // Show the modal
    modal.style.display = 'block';

    // Close modal on button click
    const closeModalButton = document.getElementById('closeModal');
    closeModalButton.addEventListener('click', () => {
        closeModal();
    });

    // Add to Shopping List
    const addToShoppingListButton = document.getElementById('addToShoppingList');
    addToShoppingListButton.addEventListener('click', toggleShoppingList);

    updateButtonState();

    // Close modal on "Esc"
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    function closeModal() {
        modal.style.display = 'none';
    }

    function toggleShoppingList() {

        const shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

        const isBookInShoppingList = shoppingList.some((item) => item.title === book.title);

        console.log('Existing Shopping List:', shoppingList);
        console.log('Is Book in Shopping List?', isBookInShoppingList);

        if (!isBookInShoppingList) {

            shoppingList.push(book);

            localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
        } else {

            const updatedShoppingList = shoppingList.filter((item) => item.title !== book.title);

            localStorage.setItem('shoppingList', JSON.stringify(updatedShoppingList));
        }

        updateButtonState();
    }

    function updateButtonState() {

        const shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

        const isBookInShoppingList = shoppingList.some((item) => item.title === book.title);

        if (isBookInShoppingList) {
            addToShoppingListButton.innerText = 'Remove from Shopping List';

            document.getElementById('congratulationsMessage').style.display = 'block';
        } else {
            addToShoppingListButton.innerText = 'Add to Shopping List';

            document.getElementById('congratulationsMessage').style.display = 'none';
        }

        console.log('Updated Button Text:', addToShoppingListButton.innerText);
        console.log('Is Book in Shopping List?', isBookInShoppingList);
    }
}

export function removeFromShoppingList(book) {

    const shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

    const updatedShoppingList = shoppingList.filter((item) => item.title !== book.title);

    localStorage.setItem('shoppingList', JSON.stringify(updatedShoppingList));

    updateButtonState();
}
