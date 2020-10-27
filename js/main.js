const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const loginForm = document.querySelector(`#logInForm`);
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
let login = localStorage.getItem(`delivery`);


function toggleModalAuth() {
  modalAuth.classList.toggle("is-open");
}

function authorized() {
  

  function logOut() {
    login = '';
    localStorage.removeItem('delivery', login);
    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
    buttonOut.removeEventListener('click', logOut);
    loginForm.reset();
    checkAuth();
  }

console.log(`Авторизован`);
  userName.textContent = login;
  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';
  buttonOut.addEventListener('click', logOut);
};

function notAuthorized() {
  console.log(`Не авторизован`);

  function logIn(evt) {
    evt.preventDefault();
    login = loginInput.value;
    if (loginInput === '') {
      logInForm.setCustomValidity('gfgh');
    }
    localStorage.setItem('delivery', login);
    toggleModalAuth();
    closeAuth.removeEventListener('click', toggleModalAuth);
    buttonAuth.removeEventListener('click', toggleModalAuth);
    logInForm.removeEventListener('submit', logIn);
    checkAuth();
  }
  closeAuth.addEventListener('click', toggleModalAuth);
  buttonAuth.addEventListener('click', toggleModalAuth);
  logInForm.addEventListener('submit', logIn);
};

function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}

checkAuth();
