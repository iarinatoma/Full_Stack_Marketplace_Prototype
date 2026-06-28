<template>
    <div>
        <site-header></site-header>

        <site-body>
            <impressum v-if="showImpressum"></impressum>
            <div v-else>
                <h2>Willkommen bei Abalo</h2>
                <p>Entdecken Sie unsere Artikel.</p>
                <artikel-suche></artikel-suche>
            </div>
        </site-body>

        <site-footer @show-impressum="showImpressum = true"></site-footer>
    </div>
</template>

<script>
import SiteHeader from './components/SiteHeader.vue';
import SiteBody from './components/SiteBody.vue';
import SiteFooter from './components/SiteFooter.vue';
import Impressum from './components/Impressum.vue';
import ArtikelSuche from './components/ArtikelSuche.vue';

export default {
    name: 'NewSite',
    components: {
        SiteHeader,
        SiteBody,
        SiteFooter,
        Impressum,
        ArtikelSuche
    },
    data() {
        return {
            showImpressum: false
        }
    }
}
</script>
