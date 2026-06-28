"use strict";

import { round, sum } from 'mathjs';
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


            // math.js aici am implementat
            var priceInEuro = round(article.price / 100, 2);
            // Prețul e stocat în Cent în baza de date.
            // round(x / 100, 2) îl convertește în Euro rotunjit la 2 zecimale.

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

        // folosit math pentru totalul cosului
        // sum() calculează suma tuturor prețurilor din coș. round() rotunjește totalul la 2 zecimale.
        let total = sum(cart.map(a => a.price));
        let totalParagraph = document.createElement("p");
        totalParagraph.innerText = "Gesamt: €" + round(total / 100, 2);
        cartContainer.appendChild(totalParagraph);

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
    // vue se initializeaza cu createApp si se monteaza pe un element html
    if (document.getElementById('vue-test')) {
        createApp({
            data() {
                return {
                    mesaj: 'Vue funktioniert!'
                };
            }
        }).mount('#vue-test');
    }

    // dynamische Artikelsuche
    if (document.getElementById('vue-search')) {
        createApp({
            data() {
                return {
                    suchbegriff: '',
                    artikel: [],
                    laden: false // cat timp asteapta raspuns
                };
            },

            watch: { //watch în Vue monitorizează o variabilă și execută o funcție când aceasta se schimbă.
                suchbegriff(neuerWert) {
                    if (neuerWert.length >= 3) { // la 3 caractere
                        this.sucheArtikel(neuerWert);
                    } else {
                        this.artikel = []; // goleste rezultatele daca cautarea e <3
                    }
                }
            },

            methods: { // functii care raspund la evenimente se pun in methods
                sucheArtikel(query) {
                    this.laden = true; // "Search..."

                    // Creăm o cerere AJAX de tip GET către API.
                    // encodeURIComponent transformă caracterele speciale din query
                    //      — de exemplu spațiul devine %20 — ca URL-ul să fie valid.
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", "/api/articles?search=" + encodeURIComponent(query));

                    xhr.onreadystatechange = () => {
                        if (xhr.readyState === 4 && xhr.status === 200) { // daca cererea s a temrinat si srveru a raspuns cu success
                            // trasbnforma din text in array java script. cu rezultate
                            // si pentru ca am this.article vue acyulaizeaza automat lista pe ecran
                            this.artikel = JSON.parse(xhr.responseText).slice(0, 5); // maxim 5 rezultate
                            this.laden = false; // dispare Search...
                        }
                    };

                    xhr.send();// trimite cererea
                },

                // folosim math.js, functia de roud transformam din cent in euro
                formatPreis(price) {
                    return round(price / 100, 2);
                }
            },

            template: `
                <div>
                    <input
                        type="text"
                        v-model="suchbegriff"
                        placeholder="Artikel suchen (min. 3 Zeichen)...">

                    <p v-if="laden">Suche...</p>

                    <ul v-if="artikel.length > 0">
                        <li v-for="item in artikel">
                            {{ item.ab_name }} - {{ formatPreis(item.ab_price) }}€
                        </li>
                    </ul>

                    <p v-if="suchbegriff.length >= 3 && artikel.length === 0 && !laden">
                        Keine Artikel gefunden.
                    </p>
                </div>
            `
        }).mount('#vue-search');
    }

    // new article cu vue
    /*
     Directive = atribute speciale HTML care încep cu v-:

    v-model — leagă un input de o variabilă (two-way binding)
    v-if / v-else — afișează/ascunde elemente condiționat
    v-for — iterează peste un array și generează HTML
    v-bind / :attr — leagă un atribut HTML de o variabilă Vue
    v-on / @event — ascultă evenimente (click, input, etc.)
    v-html — afișează HTML nemascat (atenție la XSS)

    * */
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

                    if (this.price === '' || Number(this.price) <= 0) {
                        this.fehler = 'Price muss größer als 0 sein.';
                        return;
                    }

                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", "/api/articles");
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    xhr.setRequestHeader("X-CSRF-TOKEN",
                        document.querySelector('meta[name="csrf-token"]').content);

                    xhr.onreadystatechange = () => {
                        if (xhr.readyState === 4) { // daca cererea s-a terminat
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
                    <div v-if="fehler" style="color:red;">{{ fehler }}</div>
                    <div v-if="erfolg" style="color:green;">{{ erfolg }}</div>

                    <label>Name:</label><br>
                    <input type="text" v-model="name"><br>

                    <label>Price (in Cent):</label><br>
                    <input type="number" v-model="price"><br>

                    <label>Description:</label><br>
                    <textarea v-model="description"></textarea><br>

                    <button @click="speichern">Speichern</button>
                </div>
            `
        }).mount('#vue-artikel-form');
    }

});
