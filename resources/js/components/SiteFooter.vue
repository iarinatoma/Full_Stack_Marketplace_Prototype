<template>
    <footer class="site-footer">
        <p>© 2026 Abalo</p>
        <a href="#" @click.prevent="$emit('show-impressum')">Impressum</a>
    </footer>
</template>

<script>
export default {
    name: 'SiteFooter',
    emits: ['show-impressum']
}
</script>

<style scoped>
.site-footer {
    background-color: #efb9ff;
    padding: 15px;
    text-align: center;
    margin-top: 20px;
}
.site-footer a {
    margin-left: 10px;
    color: #333;
}
</style>
