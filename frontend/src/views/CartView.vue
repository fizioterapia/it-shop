<template>
    <div>
        <h1>Cart</h1>
        <h2>Items: {{ getCartAmount }}</h2>

        <ul v-if="items.length > 0">
            <li v-for="(item, index) in items" :key="index">
                <img :src="item.image ? `http://localhost:3000/${item.image}` : 'http://localhost:3000/public/assets/images/default.png'" /> <br />
                {{item.name}} <br />
                {{item.price}} USD <br />
                {{item.categoryName}} <br />
                {{item.count}} <br />
                <button @click.prevent="remove(item.id)" type="submit">Remove from cart</button>
            </li>
            <button type="submit" @click="buy">Checkout</button>
        </ul>
        <h2 v-else>
            Nothing inside!
        </h2>
        
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import axios from 'axios';

    export default {
        data() {
            return {
                items: []
            }
        },
        watch: {
            'getCartAmount': function () {
                this.getItemsInfo()
            }
        },
        computed: {
            ...mapGetters(['getCart', 'getCartAmount', 'isAuthenticated', 'getUsername', 'getToken'])
        },
        async mounted() {
            this.getItemsInfo();
        },
        methods: {
            ...mapActions(['removeFromCart']),
            async getItemsInfo() {
                this.items = [];
                const cart = this.getCart;

                cart.forEach(async (elem) => {
                    const res = await fetch(`http://localhost:3000/items/${elem.itemId}`);
                    let data = await res.json();
                    data = data[0];
                    data.count = elem.count;

                    this.items.push(data);
                });
            },
            remove(id) {
                this.removeFromCart(id);
            },
            async buy() {
                if(!this.isAuthenticated) {
                    this.$router.push('/login');
                }

                const res = await axios.post(`http://localhost:3000/user/checkout`, {token: this.getToken, username: this.getUsername, items: this.getCart});
                console.log(res);
            }
        }
    }
</script>