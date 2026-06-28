<template>
    <header class="menu">
        <h1>Abalo</h1>
        <nav>
            <a href="/" class="menu__item">Home</a>
            <a href="/articles" class="menu__item">Kategorien</a>
            <a href="/newarticle" class="menu__item">Verkaufen</a>
            <span class="menu__item">
                Unternehmen
                <span class="menu__submenu">
                    <a href="#" class="menu__item">Philosophie</a>
                    <a href="#" class="menu__item">Karriere</a>
                </span>
            </span>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'SiteHeader'
}
</script>

<style scoped>
.menu__item:hover .menu__submenu {
    display: block;
}
</style>
