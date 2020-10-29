'use strict';

import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js';

const RED_COLOR = `#ff0000`;

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const loginForm = document.querySelector(`#logInForm`);
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const cardsRest = document.querySelector('.cards-restaurants');
const promoContainer = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardMenu = document.querySelector('.cards-menu');

let login = localStorage.getItem(`delivery`);

function validName(str) {
const regName = /^[a-zA-z][a-zA-Z0-9-_\.]{3,20}$/;
return regName.test(str);
}

function toggleModal() {
  modal.classList.toggle("is-open");
}

function toggleModalAuth() {
  clearForm();
  modalAuth.classList.toggle("is-open");
  if (modalAuth.classList.contains('is-open')) {
    window.disableScroll();
  } else {
    window.enableScroll();
  }
}

function clearForm() {
  loginInput.style.borderColor = ``;
  loginForm.reset();
}

function authorized() {

  function logOut() {
    login = null;
    localStorage.removeItem('delivery', login);
    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
    buttonOut.removeEventListener('click', logOut);

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

    if (validName(loginInput.value.trim())) {
      login = loginInput.value;
      localStorage.setItem('delivery', login);
      toggleModalAuth();
      closeAuth.removeEventListener('click', toggleModalAuth);
      buttonAuth.removeEventListener('click', toggleModalAuth);
      logInForm.removeEventListener('submit', logIn);
      loginForm.reset();
      checkAuth();
    } else {
      loginInput.style.borderColor = RED_COLOR;
      loginInput.value = '';
    }

  }
  closeAuth.addEventListener('click', toggleModalAuth);
  buttonAuth.addEventListener('click', toggleModalAuth);
  logInForm.addEventListener('submit', logIn);
  modalAuth.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('is-open')) {
      toggleModalAuth();
    }
  });
};

function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}

function createCard() {
  const card = `
    <a class="card card-restaurant">
						<img src="img/pizza-plus/preview.jpg" alt="image" class="card-image" />
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title">Пицца плюс</h3>
								<span class="card-tag tag">50 мин</span>
							</div>
							
							<div class="card-info">
								<div class="rating">
									4.5
								</div>
								<div class="price">От 900 ₽</div>
								<div class="category">Пицца</div>
							</div>
						</div>
                    </a> 
                    `;

  cardsRest.insertAdjacentHTML('beforeend', card);
};


function createCardGood() {
  const card = document.createElement('div');
  card.className = `card`;

  card.insertAdjacentHTML('beforeend', `
						<img src="img/pizza-plus/pizza-vesuvius.jpg" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">Пицца Везувий</h3>
							</div>
							<!-- /.card-heading -->
							<div class="card-info">
								<div class="ingredients">Соус томатный, сыр «Моцарелла», ветчина, пепперони, перец
	                            «Халапенье», соус «Тобаско», томаты.
								</div>
							</div> 
							<div class="card-buttons">
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">545 ₽</strong>
							</div>
        `);

        cardMenu.insertAdjacentElement('beforeend',card);

};

 function openGoods(evt) {
  const target = evt.target;

  if (login) {
  const restaraunt = target.closest('.card-restaurant');
  if (restaraunt) {
    cardMenu.textContent = '';
    promoContainer.classList.add('hide');
    restaurants.classList.add('hide');
    menu.classList.remove('hide');

  createCardGood();
  createCardGood();
  createCardGood();
  }
} else {
  toggleModalAuth();
}

};

cartButton.addEventListener("click", toggleModal);

close.addEventListener("click", toggleModal);

cardsRest.addEventListener('click', openGoods);


logo.addEventListener('click', function () {
  promoContainer.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
});

checkAuth();

createCard();
createCard();
createCard();
createCard();

new Swiper('.swiper-container', {
sliderPerView: 1,
loop: true,
autoplay: true,
pagination: {
  el: '.swiper-pagination',
  type: 'bullets'
  },
});