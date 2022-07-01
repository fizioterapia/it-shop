<template>
    <nav>
        <div class="nav--name">
            IT Shop
        </div>
        <div class="nav--links">
            <router-link to="/">Main</router-link>
            <router-link v-for="category in categories" :key="category.id" :to="`/category/${category.id}`">{{category.name}}</router-link>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            categories: []
        }
    },
    async mounted() {
        const response = await fetch("http://localhost:3000/categories");
        console.log(response);
        this.categories = await response.json();
    }
}
</script>