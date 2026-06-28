<template>
    <main class="site-body">
        <slot></slot> 
    </main>
</template>

<script>
export default {
    name: 'SiteBody'
}
</script>

<style scoped>
.site-body {
    padding: 20px;
    min-height: 400px;
}
</style>
