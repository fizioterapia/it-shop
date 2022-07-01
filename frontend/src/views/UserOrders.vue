<template>
    <div>
        <h1>Orders</h1>

        <div v-for="(order, index) in orders" :key="index">
            <h3>Order - {{order.orderedAt}}</h3>
            <ul>
                <li v-for="(item, index) in order.items" :key="index">
                    <hr>
                    <img :src="items[item.itemId].image ? `http://localhost:3000/${items[item.itemId].image}` : 'http://localhost:3000/public/assets/images/default.png'" /> <br />
                    {{items[item.itemId].name}}<br>
                    {{item.count}}<br>
                    {{items[item.itemId].price * item.count}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import axios from 'axios';

    export default {
        data() {
            return {
                orders: [],
                items: {

                }
            }
        },
        computed: {
            ...mapGetters(['getUsername', 'getToken'])
        },
        async mounted() {
            await this.getOrderInfo();
        },
        methods: {
            async getProductInfo(id) {
                const res = await axios.get(`http://localhost:3000/items/${parseInt(id)}`);
                return res.data[0];
            },
            async getOrderInfo() {
                this.orders = [];

                const res = await axios.post(`http://localhost:3000/user/orders`, {token: this.getToken, username: this.getUsername});
                res.data.forEach(async (elem) => {
                    const data = JSON.parse(elem.order);
                    const date = elem.orderedAt;

                    data.forEach(async (elem) => {
                        this.items[elem.itemId] = await this.getProductInfo(elem.itemId)
                    })

                    this.orders.push({
                        items: data,
                        orderedAt: date
                    })
                });

                console.log(this.items);
            },
        }
    }
</script>