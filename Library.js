const bookBtn = document.querySelector('.add-book-btn');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-btn');
const readBtn = document.querySelectorAll('.not-read');
const readBtnArr = Array.from(readBtn);
const modalForm = document.querySelector('.modal-form');
const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const inputPages = document.querySelector('#pages');
const inputCheckbox = document.querySelector('#checkbox');
const booksContainer = document.querySelector('.books-container');
const bookArr = [];
const localStorage = window.localStorage;

bookBtn.addEventListener('click', ()=>{ // 모달 보여주기
  modal.classList.add('show');
});

function removeModal() { // 모달 숨기기
  modal.classList.remove('show');
}

closeBtn.addEventListener('click', removeModal);

booksContainer.addEventListener('click', (e)=>{
  const target = e.target;

  if(target.classList.contains('not-read')) {
    target.classList.toggle('read');
    target.textContent = target.classList.contains('read') ? 'Read' : 'Not read';
  }

  if(target.classList.contains('remove')) {
    const bookCard = target.closest('.book');
    const titleElement = bookCard.querySelector('.title');
    const title = titleElement ? titleElement.textContent : '';

    const storageBooks = getStoageBooks();
    const updatedBooks = storageBooks.filter(book =>book.title !== title);
    localStorage.setItem('books', JSON.stringify(updatedBooks));

    booksContainer.removeChild(bookCard);
  }
});

readBtnArr.forEach(btn =>{ // 읽음/안읽음 버튼
  btn.addEventListener('click', ()=>{
    btn.classList.toggle('read');
    if(btn.classList.contains('read')) {
      btn.innerHTML = 'Read';
    } else {
      btn.innerHTML = 'Not read';
    }
  })
});

modalForm.addEventListener('submit', function(e){ // 책 정보 저장
  e.preventDefault();
  const bookItem = {
    title: inputTitle.value,
    author: inputAuthor.value,
    pages: inputPages.value,
    inputCheckbox: inputCheckbox.checked
  }
  const storageBooks = getStoageBooks();  // storageBooks를 여기서 정의
  localStorage.setItem('books', JSON.stringify([...storageBooks, bookItem]));
  makeBookCard();
  removeModal();
});

function getStoageBooks() { // 책 정보 로컬스토리지에 저장
  const localBooks = localStorage.getItem('books');
  return localBooks ? JSON.parse(localBooks) : [];
}

function makeBookCard() { // 카드 화면에 그리기
  const stoageBooks = getStoageBooks();
  booksContainer.innerHTML = '';
  stoageBooks.forEach((book)=>{
    const bookCard = document.createElement('div');
    bookCard.classList.add('book');

    // title
    const titleParagraph = document.createElement('p');
    titleParagraph.classList.add('title');
    titleParagraph.textContent = book.title;
    bookCard.appendChild(titleParagraph);

    // author
    const authorParagraph = document.createElement('p');
    authorParagraph.classList.add('author');
    authorParagraph.textContent = book.author;
    bookCard.appendChild(authorParagraph);

    // pages
    const pagesParagraph = document.createElement('p');
    pagesParagraph.classList.add('pages');
    pagesParagraph.textContent = `${book.pages} pages`;
    bookCard.appendChild(pagesParagraph);

    // read button
    const readButton = document.createElement('button');
    readButton.classList.add('book-btn', book.inputCheckbox ? 'read' : 'not-read');
    readButton.textContent = book.inputCheckbox ? 'Read' : 'Not read';
    bookCard.appendChild(readButton);

    readButton.addEventListener('click', function() {
      const index = stoageBooks.findIndex(b => b.title === book.title);
      stoageBooks[index].inputCheckbox = !stoageBooks[index].inputCheckbox;
      localStorage.setItem('books', JSON.stringify(stoageBooks));

      readButton.classList.contains('read') && readButton.classList.add('not-read');
      if (readButton.classList.contains('read')) {
        readButton.innerHTML = 'Read';
      } else {
        readButton.innerHTML = 'Not read';
      }
    });

    // remove button
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove', 'book-btn');
    removeButton.textContent = 'Remove';
    bookCard.appendChild(removeButton);

    // 컨테이너에 책 카드 추가
    booksContainer.appendChild(bookCard);
  });
  inputAuthor.value = '';
  inputTitle.value = '';
  inputPages.value = '';
  inputCheckbox.checked = false;
}

function initialize() { // 새로고침 시 데이터 복구
  // 저장된 책 정보 불러오기
  const storageBooks = getStoageBooks();

  // 저장된 책 정보를 기반으로 화면에 카드 생성
  storageBooks.forEach(book => makeBookCard(book));
}
initialize();