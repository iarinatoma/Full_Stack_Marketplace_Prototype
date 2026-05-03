"use strict";

let cart = [];

let cartContainer = document.getElementById("cart");
let addButtons = document.getElementsByClassName("add-to-cart");

for (let i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener("click", function () {
        let id = this.dataset.id;
        let name = this.dataset.name;
        let price = this.dataset.price;

        addArticleToCart(id, name, price, this);
    });
}

function addArticleToCart(id, name, price, button) {
    if (isArticleInCart(id)) {
        return;
    }

    let article = {
        id: id,
        name: name,
        price: price,
        button: button
    };

    cart.push(article);

    button.disabled = true;

    showCart();
}

function isArticleInCart(id) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            return true;
        }
    }

    return false;
}

function showCart() {
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        let emptyText = document.createElement("p");
        emptyText.innerText = "Der Warenkorb ist leer.";
        cartContainer.appendChild(emptyText);
        return;
    }

    let ul = document.createElement("ul");

    for (let i = 0; i < cart.length; i++) {
        let article = cart[i];

        let li = document.createElement("li");

        let text = document.createElement("span");
        text.innerText = article.name + " - " + article.price + " Cent ";

        let removeButton = document.createElement("button");
        removeButton.innerText = "-";

        removeButton.addEventListener("click", function () {
            removeArticleFromCart(article.id);
        });

        li.appendChild(text);
        li.appendChild(removeButton);
        ul.appendChild(li);
    }

    cartContainer.appendChild(ul);
}

function removeArticleFromCart(id) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart[i].button.disabled = false;
            cart.splice(i, 1);
            break;
        }
    }

    showCart();
}
