"use strict";

let cart = [];
let cartContainer = document.getElementById("cart");
let addButtons = document.getElementsByClassName("add-to-cart");

// cerinta d) - incarca cosul la reload
function ladeWarenkorb() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/shoppingcart");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var items = JSON.parse(xhr.responseText);

            for (var i = 0; i < items.length; i++) {
                var item = items[i];

                // dezactivam butonul + pentru articolele deja in cos
                var buttons = document.getElementsByClassName("add-to-cart");
                for (var j = 0; j < buttons.length; j++) {
                    if (buttons[j].dataset.id == item.article_id) {
                        buttons[j].disabled = true;
                    }
                }

                cart.push({
                    id: item.article_id,
                    name: item.name,
                    price: item.price,
                    cartId: item.ab_shoppingcart_id
                });
            }

            showCart();
        }
    };

    xhr.send();
}

// cerinta b) - adauga articol in cos
for (var i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener("click", function() {
        var id = this.dataset.id;
        var name = this.dataset.name;
        var price = this.dataset.price;
        var button = this;

        // verificam daca e deja in cos
        var articleInCart = false;
        for (var j = 0; j < cart.length; j++) {
            if (cart[j].id === id) {
                articleInCart = true;
            }
        }

        if (articleInCart) {
            return;
        }

        // trimitem la server
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/shoppingcart");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("X-CSRF-TOKEN",
            document.querySelector('meta[name="csrf-token"]').content);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);

                cart.push({
                    id: id,
                    name: name,
                    price: price,
                    cartId: response.id
                });

                button.disabled = true;
                showCart();
            }
        };

        xhr.send("articleid=" + id);
    });
}

function showCart() {
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        var emptyText = document.createElement("p");
        emptyText.innerText = "Der Warenkorb ist leer.";
        cartContainer.appendChild(emptyText);
        return;
    }

    var ul = document.createElement("ul");

    for (var i = 0; i < cart.length; i++) {
        var article = cart[i];

        var li = document.createElement("li");
        li.innerText = article.name + " - " + article.price + " Cent ";

        var removeButton = document.createElement("button");
        removeButton.innerText = "-";
        removeButton.dataset.id = article.id;
        removeButton.dataset.cartId = article.cartId;

        removeButton.addEventListener("click", function() {
            var articleId = this.dataset.id;
            var cartId = this.dataset.cartId;

            // cerinta c) - sterge de pe server
            var xhr = new XMLHttpRequest();
            xhr.open("DELETE", "/api/shoppingcart/" + cartId + "/articles/" + articleId);
            xhr.setRequestHeader("X-CSRF-TOKEN",
                document.querySelector('meta[name="csrf-token"]').content);

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    // stergem din array local
                    for (var j = 0; j < cart.length; j++) {
                        if (cart[j].id == articleId) {
                            cart.splice(j, 1);
                            break;
                        }
                    }

                    // re-activam butonul + din pagina dupa data-id
                    var buttons = document.getElementsByClassName("add-to-cart");
                    for (var k = 0; k < buttons.length; k++) {
                        if (buttons[k].dataset.id == articleId) {
                            buttons[k].disabled = false;
                        }
                    }

                    showCart();
                }
            };

            xhr.send();
        });

        li.appendChild(removeButton);
        ul.appendChild(li);
    }

    cartContainer.appendChild(ul);
}

// pornire - incarca cosul din baza de date
ladeWarenkorb();
