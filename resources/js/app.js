"use strict";

import { round } from 'mathjs';
import { createApp, h } from 'vue';

// navigatie
window.navigationsMeniu = {
    meniu: [
        { text: "Home",        href: "/" },
        { text: "Kategorien",  href: "/articles" },
        { text: "Verkaufen",   href: "/newarticle" },
        { text: "Unternehmen", href: "#" }
    ],

    subMeniu: [
        { text: "Philosophie", href: "#" },
        { text: "Karriere",    href: "#" }
    ],

    init: function() {
        this.container = document.getElementById("navigation");
        if (this.container) this.createMenu();
    },

    createLink: function(text, href) {
        let link = document.createElement("a");
        link.innerText = text;
        link.href = href;
        return link;
    },

    createMenu: function() {
        let ul = document.createElement("ul");
        for (let i = 0; i < this.meniu.length; i++) {
            let li = document.createElement("li");
            let link = this.createLink(this.meniu[i].text, this.meniu[i].href);
            li.appendChild(link);
            if (this.meniu[i].text === "Unternehmen") {
                let subUl = document.createElement("ul");
                for (let j = 0; j < this.subMeniu.length; j++) {
                    let subLi = document.createElement("li");
                    let subLink = this.createLink(this.subMeniu[j].text, this.subMeniu[j].href);
                    subLi.appendChild(subLink);
                    subUl.appendChild(subLi);
                }
                li.appendChild(subUl);
            }
            ul.appendChild(li);
        }
        this.container.appendChild(ul);
    }
};

// verificare cookie
window.initCookieCheck = function() {
    let cookies = document.cookie.split("; ");
    let aceptare;

    for (let i = 0; i < cookies.length; i++) {
        let parte = cookies[i].split("=");
        if (parte[0] === "cookieAccepted") {
            aceptare = "yes";
        }
    }

    if (aceptare !== "yes") {

        let banner = document.createElement("div");
        banner.id = "cookie-banner";
        banner.style.position = "fixed";
        banner.style.bottom = "0";
        banner.style.left = "0";
        banner.style.width = "100%";
        banner.style.backgroundColor = "#efb9ff";
        banner.style.borderTop = "1px solid #999999";
        banner.style.padding = "15px";
        banner.style.boxSizing = "border-box";


        let text = document.createElement("p");
        text.innerText = "Diese Webseite verwendet Cookies. Mit der Nutzung stimmen Sie der Verwendung von Cookies zu.";


        let button = document.createElement("button");
        button.innerText = "Einverstanden";

        button.addEventListener("click", function() {
            let data = new Date();
            data.setTime(data.getTime() + 30 * 24 * 60 * 60 * 1000);
            let expires = "expires=" + data.toUTCString();
            document.cookie = "cookieAccepted; " + expires + "; path=/";
            banner.remove();
        });

        banner.appendChild(text);
        banner.appendChild(button);
        document.body.appendChild(banner);
    }
};

// cos de cumparaturi
window.initWarenkorb = function() {
    let cart = [];
    let cartContainer = document.getElementById("cart");
    let addButtons = document.getElementsByClassName("add-to-cart");

    function ladeWarenkorb() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/api/shoppingcart");

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var items = JSON.parse(xhr.responseText);
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
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
                        cartId: item.ab_shoppingcart_id,
                        button: null
                    });
                }
                showCart();
            }
        };
        xhr.send();
    }

    for (var i = 0; i < addButtons.length; i++) {
        addButtons[i].addEventListener("click", function() {
            var id = this.dataset.id;
            var name = this.dataset.name;
            var price = this.dataset.price;
            var button = this;
            var articleInCart = false;

            for (var j = 0; j < cart.length; j++) {
                if (cart[j].id === id) articleInCart = true;
            }

            if (articleInCart) return;
            var xhr = new XMLHttpRequest();

            xhr.open("POST", "/api/shoppingcart");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.setRequestHeader("X-CSRF-TOKEN",
                document.querySelector('meta[name="csrf-token"]').content);

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    cart.push({ id, name, price, cartId: response.id, button });
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


            // Aufgabe 3 - math.js aici am implementat
            var priceInEuro = round(article.price / 100, 2);

            li.innerText = article.name + " - €" + priceInEuro + " ";

            var removeButton = document.createElement("button");
            removeButton.innerText = "-";
            removeButton.dataset.id = article.id;
            removeButton.dataset.cartId = article.cartId;

            removeButton.addEventListener("click", function() {
                var articleId = this.dataset.id;
                var cartId = this.dataset.cartId;
                var xhr = new XMLHttpRequest();

                xhr.open("DELETE", "/api/shoppingcart/" + cartId + "/articles/" + articleId);
                xhr.setRequestHeader("X-CSRF-TOKEN",
                    document.querySelector('meta[name="csrf-token"]').content);

                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        for (var j = 0; j < cart.length; j++) {
                            if (cart[j].id == articleId) {
                                if (cart[j].button) cart[j].button.disabled = false;
                                cart.splice(j, 1);
                                break;
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

    ladeWarenkorb();
};

// aici se incarca efectiv toate
document.addEventListener('DOMContentLoaded', function() {

    if (document.getElementById("navigation")) {
        window.navigationsMeniu.init();
    }

    window.initCookieCheck();

    if (document.getElementById("cart")) {
        window.initWarenkorb();
    }

    // aici testam verbindung cu vue
    if (document.getElementById('vue-test')) {
        createApp({
            data() { return { mesaj: 'Vue funktioniert!' }; },
            render() { return h('p', this.mesaj); }
        }).mount('#vue-test');
    }

    // dynamische Artikelsuche
    if (document.getElementById('vue-search')) {
        createApp({
            data() {
                return {
                    suchbegriff: '',
                    artikel: [],
                    laden: false
                };
            },

            watch: {
                suchbegriff(neuerWert) {
                    if (neuerWert.length >= 3) {
                        this.sucheArtikel(neuerWert);
                    } else {
                        this.artikel = [];
                    }
                }
            },

            methods: {
                sucheArtikel(query) {
                    this.laden = true;
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", "/api/articles?search=" + encodeURIComponent(query));

                    xhr.onreadystatechange = () => {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                            this.artikel = JSON.parse(xhr.responseText).slice(0, 5);
                            this.laden = false;
                        }
                    };

                    xhr.send();
                }
            },
            render() {
                return h('div', [
                    h('input', {
                        type: 'text',
                        placeholder: 'Artikel suchen (min. 3 Zeichen)...',
                        value: this.suchbegriff,
                        onInput: (e) => { this.suchbegriff = e.target.value; },
                        style: 'padding:8px;width:300px;margin-bottom:10px;'
                    }),

                    this.laden ? h('p', 'Suche...') : null,
                    this.artikel.length > 0
                        ? h('ul', this.artikel.map(a =>
                            h('li', `${a.ab_name} - ${round(a.ab_price / 100, 2)}€`)
                        ))
                        : null,
                    this.suchbegriff.length >= 3 && this.artikel.length === 0 && !this.laden
                        ? h('p', 'Keine Artikel gefunden.')
                        : null
                ]);
            }
        }).mount('#vue-search');
    }

    // new article cu vue
    // Vue Features: v-model, v-if, @click, data(), methods()
    if (document.getElementById('vue-artikel-form')) {
        createApp({
            data() {
                return {
                    name: '',
                    price: '',
                    description: '',
                    fehler: '',
                    erfolg: ''
                };
            },
            methods: {
                speichern() {
                    this.fehler = '';
                    this.erfolg = '';

                    if (this.name === '') {
                        this.fehler = 'Name darf nicht leer sein.';
                        return;
                    }

                    if (this.price <= 0 || this.price === '') {
                        this.fehler = 'Price muss größer als 0 sein.';
                        return;
                    }

                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", "/api/articles");
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    xhr.setRequestHeader("X-CSRF-TOKEN",
                        document.querySelector('meta[name="csrf-token"]').content);

                    xhr.onreadystatechange = () => {
                        if (xhr.readyState === 4) {
                            if (xhr.status === 200) {
                                var response = JSON.parse(xhr.responseText);
                                this.erfolg = 'Artikel erfolgreich gespeichert! ID: ' + response.id;
                                this.name = '';
                                this.price = '';
                                this.description = '';
                            } else {
                                var err = JSON.parse(xhr.responseText);
                                this.fehler = err.error || 'Ein Fehler ist aufgetreten.';
                            }
                        }
                    };

                    xhr.send(
                        'name=' + encodeURIComponent(this.name) +
                        '&price=' + encodeURIComponent(this.price) +
                        '&description=' + encodeURIComponent(this.description)
                    );
                }
            },

            template: `
            <div>
                <div v-if="fehler" style="color:red;margin-bottom:10px;">{{ fehler }}</div>
                <div v-if="erfolg" style="color:green;margin-bottom:10px;">{{ erfolg }}</div>
                <label>Name:</label><br>
                <input type="text" v-model="name" style="margin-bottom:10px;"><br>
                <label>Price (in Cent):</label><br>
                <input type="number" v-model="price" style="margin-bottom:10px;"><br>
                <label>Description:</label><br>
                <textarea v-model="description" style="margin-bottom:10px;"></textarea><br>
                <button @click="speichern">Speichern</button>
            </div>
        `
        }).mount('#vue-artikel-form');
    }

});
