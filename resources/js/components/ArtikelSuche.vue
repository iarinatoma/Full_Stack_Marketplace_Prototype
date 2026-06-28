<template>
    <div class="search">
        <h2>Artikel suchen</h2>
        <input
            type="text"
            v-model="suchbegriff"
            placeholder="Artikel suchen (min. 3 Zeichen)..."
            class="search__input"
        >

        <p v-if="laden">Suche...</p>

        <ul v-if="artikel.length > 0" class="search__results">
            <li v-for="item in artikel" :key="item.id"
                :class="['search__item', isInCart(item.id) ? 'search__item--in-cart' : '']">
                {{ item.ab_name }} - {{ formatPreis(item.ab_price) }}€
                <Rating :modelValue="3" :readonly="true" />
                <button @click="addToCart(item)" :disabled="isInCart(item.id)">+</button>
            </li>
        </ul>

        <p v-if="suchbegriff.length >= 3 && artikel.length === 0 && !laden">
            Keine Artikel gefunden.
        </p>

        <div v-if="totalPages > 1" class="pagination">
            <button @click="vorherige" :disabled="page === 1">←</button>
            <span>Seite {{ page }} von {{ totalPages }}</span>
            <button @click="naechste" :disabled="page === totalPages">→</button>
        </div>

        <div v-if="cart.length > 0" class="cart">
            <h3>Warenkorb</h3>
            <p class="cart__total">Gesamt: {{ formatPreis(cartTotal) }}€</p>
            <ul>
                <li v-for="item in cart" :key="item.id" class="cart__item">
                    {{ item.name }} - {{ formatPreis(item.price) }}€
                    <button @click="removeFromCart(item)">-</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { round } from 'mathjs';

export default {
    name: 'ArtikelSuche',
    data() {
        return {
            suchbegriff: '',
            artikel: [],
            laden: false,
            cart: [],
            page: 1,
            totalPages: 1
        };
    },
    computed: {
        cartTotal() {
            return this.cart.reduce((sum, item) => sum + item.price, 0);
        }
    },
    watch: {
        suchbegriff() {
            this.page = 1; // 6b — reset la pagina 1 cand se schimba cautarea
            if (this.suchbegriff.length >= 3) {
                this.sucheArtikel();
            } else {
                this.artikel = [];
                this.totalPages = 1;
            }
        }
    },
    mounted() {
        this.ladeWarenkorb();
    },
    methods: {
        sucheArtikel() {
            this.laden = true;
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "/api/articles?search=" + encodeURIComponent(this.suchbegriff) + "&page=" + this.page);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    this.artikel = response.data;
                    this.totalPages = response.totalPages;
                    this.laden = false;
                }
            };
            xhr.send();
        },
        vorherige() { // buton ←
            if (this.page > 1) {
                this.page--;
                this.sucheArtikel();
            }
        },
        naechste() { // buton →
            if (this.page < this.totalPages) {
                this.page++;
                this.sucheArtikel();
            }
        },
        formatPreis(price) {
            return round(price / 100, 2);
        },
        isInCart(id) {
            return this.cart.some(i => i.article_id == id);
        },
        ladeWarenkorb() {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "/api/shoppingcart");
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    this.cart = JSON.parse(xhr.responseText);
                }
            };
            xhr.send();
        },
        addToCart(item) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/api/shoppingcart");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.setRequestHeader("X-CSRF-TOKEN",
                document.querySelector('meta[name="csrf-token"]').content);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    this.ladeWarenkorb();
                }
            };
            xhr.send("articleid=" + item.id);
        },
        removeFromCart(item) {
            var xhr = new XMLHttpRequest();
            xhr.open("DELETE", "/api/shoppingcart/" + item.ab_shoppingcart_id + "/articles/" + item.article_id);
            xhr.setRequestHeader("X-CSRF-TOKEN",
                document.querySelector('meta[name="csrf-token"]').content);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    this.ladeWarenkorb();
                }
            };
            xhr.send();
        }
    }
}
</script>
