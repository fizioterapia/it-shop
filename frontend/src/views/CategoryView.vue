<template>
    <div class="categories">
        <router-link v-for="item in items" :key="item.id" :to="{ path: `/items/${item.id}` }" class="shop-element">
            <ShopItem :data="item" />
        </router-link>
    </div>
</template>

<script>
    import ShopItem from "../components/ShopItem.vue"
    import axios from 'axios';

    export default {
        components: {
            ShopItem
        },
        data() {
            return {
                items: []
            }
        },
        async created() {
            this.$watch(
                () => this.$route.params?.categoryId,
                async () => {
                    await this.updateItems();
                },
            )
        },
        methods: {
            async updateItems() {
                const res = await axios.get(`http://localhost:3000/categories/items/${this.$route.params.categoryId}`);
                this.items = await res.data;
            }
        },
        async mounted() {
            await this.updateItems();
        },
    }
</script>