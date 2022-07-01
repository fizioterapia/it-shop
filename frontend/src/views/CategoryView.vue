<template>
    <div class="categories">
        <router-link v-for="item in items" :key="item.id" :to="{ path: `/items/${item.id}` }" class="shop-element">
            <ShopItem :data="item" />
        </router-link>
    </div>
</template>

<script>
    import ShopItem from "../components/ShopItem.vue"
    export default {
        components: {
            ShopItem
        },
        data() {
            return {
                categoryId: 0,
                items: []
            }
        },
        async mounted() {
            this.categoryId = this.$route.params.categoryId

            const res = await fetch(`http://localhost:3000/categories/items/${this.categoryId}`);
            this.items = await res.json();
        }
    }
</script>