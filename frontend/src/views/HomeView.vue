<template>
  <div>
    <h1>Featured Items</h1>
      <div class="categories">
        <router-link v-for="item in featuredItems" :key="item.id" :to="{ path: `/items/${item.id}` }" class="shop-element">
            <ShopItem :data="item" />
        </router-link>
      </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import ShopItem from '../components/ShopItem.vue';

  export default {
    components: {
      ShopItem
    },
    data() {
      return {
        featuredItems: []
      }
    },
    methods: {
      async retrieveFeatured() {
        let res = await axios.get("http://localhost:3000/items/featured");
        this.featuredItems = res.data;
      }
    },
    async mounted() {
      await this.retrieveFeatured();
    }
  }
</script>