'use strict';

import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js';

const URL = './db/partners.json';
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
const cardTitle = document.querySelector('.restaurant-title');
const cardRaiting = document.querySelector('.rating');
const cardPrice = document.querySelector('.price');
const cardCategory = document.querySelector('.category');
const inputSearch = document.querySelector('.input-search');
const cancelButton = document.querySelector('.clear-cart');


let login = localStorage.getItem(`delivery`);

const getData = async function (url) {

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
  }

  return await response.json();
};


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
    cartButton.style.display = '';
    buttonOut.removeEventListener('click', logOut);

    checkAuth();
  }

  console.log(`Авторизован`);

  userName.textContent = login;

  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'flex';
  cartButton.style.display = 'flex';

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

function createCard({ image, kitchen, name, price, products, stars, time_of_delivery }) {
  const cardRests = document.createElement('a');
  cardRests.className = 'card card-restaurant';
  cardRests.products = products;
  cardRests.info = { name, kitchen, price, stars };
  const card = `
						<img src="${image}" alt="image" class="card-image" />
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title"> ${name} </h3>
								<span class="card-tag tag">${time_of_delivery} </span>
							</div>
							<div class="card-info">
								<div class="rating">
									${stars} 
								</div>
								<div class="price">От ${price}  ₽</div>
								<div class="category">${kitchen} </div>
							</div>
						</div>
                    `;
  cardRests.insertAdjacentHTML('beforeend', card);
  cardsRest.insertAdjacentElement('beforeend', cardRests);
};


function createCardGood({ description, image, name, price, id}) {
  const card = document.createElement('div');
  card.className = 'card';
  card.insertAdjacentHTML('beforeend', `
						<img src="${image}" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">${name}</h3>
							</div>
							<div class="card-info">
								<div class="ingredients">
	              ${description}
								</div>
							</div> 
							<div class="card-buttons">
								<button class="button button-primary button-add-cart" id='${id}'>
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">${price} ₽</strong>
							</div>
        `);

  cardMenu.insertAdjacentElement('beforeend', card);
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

      const { name, kitchen, price, stars } = restaraunt.info;

      cardTitle.textContent = name;
      cardRaiting.textContent = stars;
      cardPrice.textContent = `Oт ${price} р.`;
      cardCategory.textContent = kitchen;

      getData(`./db/${restaraunt.products}`).then(function (data) {
        data.forEach(createCardGood);
      });
    }
  } else {
    toggleModalAuth();
  }

};

function init() {
  getData(URL).then(function (data) {
    data.forEach(createCard);
  });

  cartButton.addEventListener("click", toggleModal);
  cancelButton.addEventListener("click", window.cart.cancel);
  close.addEventListener("click", function () {
    window.cart.render();
    toggleModal();
  });


  window.cart.click();
  cardsRest.addEventListener('click', openGoods);
cardMenu.addEventListener('click', window.cart.add);

  logo.addEventListener('click', function () {
    promoContainer.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
  });

  checkAuth();

  new Swiper('.swiper-container', {
    sliderPerView: 1,
    loop: true,
    autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets'
    },
  });

  inputSearch.addEventListener('keypress', function (evt) {

    if (evt.charCode === 13) {
      const value = evt.target.value.trim();

      if (!value) {
        evt.target.style.backgroundColor = RED_COLOR;
        evt.target.value = '';
        setTimeout(function() {
          evt.target.style.backgroundColor= '';
        }, 1000)
        return;
      }
      getData(URL).then(function (data) {
        return data.map(function (partner) {
          return partner.products;
        })
      })
        .then(function (linkProducts) {
          cardMenu.textContent = '';
          linkProducts.forEach(function (link) {
            getData(`./db/${link}`)
              .then(function (data) {

                const resultSearch = data.filter(function (item) {
                  const name = item.name.toLowerCase();
                  return name.includes(value.toLowerCase());
                })
                promoContainer.classList.add('hide');
                restaurants.classList.add('hide');
                menu.classList.remove('hide');

                cardTitle.textContent = 'Результат поиска';
                cardRaiting.textContent = '';
                cardPrice.textContent = '';
                cardCategory.textContent = '';
                resultSearch.forEach(createCardGood);
              })
          })
        })
    }
  })
}

init();