<template>
    <nav>
        <div class="nav--name">
            IT Shop
        </div>
        <div class="nav--links">
            <router-link to="/">Main</router-link>
            <router-link v-for="category in categories" :key="category.id" :to="`/category/${category.id}`">{{category.name}}</router-link>
            <router-link v-if="getUsername == ''" to="/login">Login</router-link>
            <div v-else>
                {{ getUsername }}
                <a href="#" @click.prevent="logout()">Logout</a>
            </div>
        </div>
    </nav>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {
            categories: [],
        }
    },
    computed: {
        ...mapGetters(['getUsername'])
    },
    methods: {
        ...mapActions(['Logout']),
        async logout() {
            await this.Logout();
            this.$router.push("/");
        }
    },
    async mounted() {
        const response = await fetch("http://localhost:3000/categories");
        console.log(response);
        this.categories = await response.json();
    }
}
</script>