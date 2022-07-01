<template>
    <div>
        <h1>Add Category</h1>
        <form ref="form">
            <label for="category">Category</label>
            <input type="text" name="name" />

            <button @click.prevent="submit()" type="submit">Add Item</button>
        </form>
    </div>
</template>

<script> 
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            categories: []
        }
    },
    computed: {
        ...mapGetters(['getToken'])
    },
    methods: {
        async submit() {
            const form = new FormData(this.$refs.form);
            form.append("token", this.getToken);
            const res = await axios.post('http://localhost:3000/categories/add', form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(res.data);
        },
        async updateCategories() {
            const response = await fetch("http://localhost:3000/categories");
            this.categories = await response.json();
        }
    },
    async mounted() {
        this.updateCategories()
    }
}
</script>