<template>
    <div class="item-view">
        <div class="column">
            <div class="item-view--name">
                {{data.name}}
            </div>
            <div class="item-view--category">
                {{data.categoryName}}
            </div>
            <div class="item-view--image">
                <img :src="data.image ? `http://localhost:3000/${data.image}` : 'http://localhost:3000/public/assets/images/default.png'" class="item-view--image" />
            </div>
        </div>
        <div class="column">
            <div class="item-view--price">
                {{data.price}} USD<br>
                <button @click.prevent="add" type="submit">Add To Cart</button>
            </div>
            <div class="item-view--description">
                {{data.description || 'No description'}}
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import axios from 'axios';

    export default {
        data() {
            return {
                itemId: 0,
                data: []
            }
        },
        async created() {
            this.$watch(
                () => this.$route.params?.itemId,
                async () => {
                    await this.updateItem();
                },
            )
        },
        methods: {
            ...mapActions(['addToCart']),
            async updateItem() {
                if(isNaN(this.$route.params.itemId)) return false;
                this.itemId = this.$route.params.itemId;

                const res = await axios.get(`http://localhost:3000/items/${this.itemId}`);
                const data = await res.data;

                console.log(res);

                this.data = data[0];
            },
            async add() {
                await this.addToCart(this.$route.params.itemId);
            }
        },
        async mounted() {
            await this.updateItem();
        }
    }
</script>