(function () {

    const cart = [];
    const modalBody = document.querySelector('.modal-body');
    const modalPriceTag = document.querySelector('.modal-pricetag');
    function addToCart(evt) {
        const target = evt.target;
        const buttonAddCart = target.closest('.button-add-cart');

        if (buttonAddCart) {
            const card = target.closest('.card');
            const title = card.querySelector('.card-title-reg').textContent;
            const price = card.querySelector('.card-price-bold').textContent;
            const id = buttonAddCart.id;
            const food = cart.find(function (item) {
                return item.id === id;
            })
            console.log(food);
            if (food) {
                food.count += 1;
            } else {
                cart.push({
                    id,
                    title,
                    price,
                    count: 1
                });
            }
            
            
        }
    }
    function renderCart() {
        modalBody.textContent = '';
        cart.forEach(function ({ id, count, title, price }) {
            const cartItem = ` 
    <div class="food-row">
					<span class="food-name">${title}</span>
					<strong class="food-price">${price} </strong>
					<div class="food-counter">
						<button class="counter-button counter-minus" data-id='${id}'>-</button>
						<span class="counter">${count}</span>
						<button class="counter-button counter-plus" data-id='${id}'>+</button>
					</div>
				</div>
    `;
            modalBody.insertAdjacentHTML('beforeend', cartItem);
        });
        const totalPrice = cart.reduce(function (result, item) {
            return result + (parseFloat(item.price) * item.count);
        }, 0);
        modalPriceTag.textContent = totalPrice + ' р';
    };

    const onModalBodyClick = function () {
        modalBody.addEventListener('click', changeCount);
    };

    const changeCount = function (evt) {
        const target = evt.target;
        if (target.classList.contains('counter-button')) {
            const food = cart.find(function (item) {
                return item.id === target.dataset.id;
            });
            if (target.classList.contains('counter-minus')) {
                food.count--;
                if (food.count === 0) {
                    cart.splice(cart.indexOf(food), 1);
                }
            };
            if (target.classList.contains('counter-plus')) food.count++;
            renderCart();
        }
    }

    const onCancelClick = function () {
        cart.length = 0;
        renderCart();
    }

    window.cart = {
        add: addToCart,
        render: renderCart,
        click: onModalBodyClick,
        cancel: onCancelClick
    };

})();