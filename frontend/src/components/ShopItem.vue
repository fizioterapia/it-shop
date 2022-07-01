<template>
    <div class="item">
        <img :src="data.image ? `http://localhost:3000/${data.image}` : 'http://localhost:3000/public/assets/images/default.png'" class="item--image" />
        <div class="item--name">
            {{data.name}}
        </div>
        <div class="item--price">
            {{data.price}} USD
        </div>
        <div class="item--description">
            {{data.description || "No description."}}
        </div>
    </div>
</template>

<script>
    export default {
         props: {
            data: Object
         }
    }
</script>