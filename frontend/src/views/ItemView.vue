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
                <img :src="data.image || 'http://localhost:3000/public/assets/images/default.png'" class="item-view--image" />
            </div>
        </div>
        <div class="column">
            <div class="item-view--price">
                {{data.price}} USD
            </div>
            <div class="item-view--description">
                {{data.description || 'No description'}}
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data() {
            return {
                itemId: 0,
                data: []
            }
        },
        async mounted() {
            this.itemId = this.$route.params.itemId;

            const res = await fetch(`http://localhost:3000/items/${this.itemId}`);
            const data = await res.json();

            this.data = data[0];
        }
    }
</script>