<template>
    <nav>
        <div class="nav--name">
            IT Shop
        </div>
        <div class="nav--links">
            <router-link to="/">Main</router-link>
            <router-link v-for="category in categories" :key="category.id" :to="`/category/${category.id}`">{{category.name}}</router-link>
            <router-link to="/cart">Cart</router-link>
            <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
            <router-link v-if="!isAuthenticated" to="/register">Register</router-link>
            <div v-else>
                {{ getUsername }}
                <CartBadge />
                <router-link to="/user">UCP</router-link>
                <router-link v-if="isAdmin" to="/admin">Admin</router-link> 
                <a href="#" @click.prevent="logout()">Logout</a>
            </div>
        </div>
        <div class="nav--links nav--cp">
            <router-link to="/user/orders">Orders</router-link>
            <router-link to="/user/settings">Settings</router-link>
            <router-link v-if="isAdmin" to="/admin/addcategory">Add Category</router-link> 
            <router-link v-if="isAdmin" to="/admin/additems">Add Items</router-link> 
        </div>
    </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CartBadge from "./CartBadge.vue";

export default {
    components: {
        CartBadge
    },
    data() {
        return {
            categories: [],
        }
    },
    computed: {
        ...mapGetters(['getUsername', 'isAuthenticated', 'isAdmin'])
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