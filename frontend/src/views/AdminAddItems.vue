<template>
    <div>
        <h1>Add Item</h1>
        <form ref="form">
            <label for="photo">Photo</label>
            <input type="file" name="photo" />

            <label for="name">Name</label>
            <input type="text" name="name" />

            <label for="price">Price</label>
            <input type="number" name="price" />

            <label for="desc">Description</label>
            <input type="text" name="desc" />

            <select name="category">
                <option v-for="category in categories" :key="category.id" :value="category.id">{{category.name}}</option>
            </select>

            <button @click.prevent="submit()" type="submit">Add Item</button>
        </form>
    </div>
</template>

<script> 
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['getToken'])
    },
    methods: {
        async submit() {
            const form = new FormData(this.$refs.form);
            form.append("token", this.getToken);
            const res = await axios.post('http://localhost:3000/items/add', form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(res.data);
        }
    },
    async mounted() {
        const response = await fetch("http://localhost:3000/categories");
        this.categories = await response.json();
    }
}
</script>