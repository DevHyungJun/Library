const bookBtn = document.querySelector('.add-book-btn');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-btn');

bookBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  modal.classList.add('show');
});

closeBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  modal.classList.remove('show');
})