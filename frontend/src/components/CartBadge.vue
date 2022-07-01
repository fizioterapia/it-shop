<template>
    <div class="cart-badge">
        {{ getCartAmount }}
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters(['getCartAmount'])
        }
    }
</script>