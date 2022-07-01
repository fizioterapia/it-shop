<template>
    <div>
        <h1>Settings</h1>
        <form @submit.prevent="updateData" ref="form">
            <label for="password">Password</label>
            <input type="password" name="password" />
            <label for="email">Email</label>
            <input type="text" name="email" v-model="fields.email" />
            <label for="firstName">First Name</label>
            <input type="text" name="firstName" v-model="fields.firstName" />
            <label for="lastName">Last Name</label>
            <input type="text" name="lastName" v-model="fields.lastName" />
            <label for="phoneNumber">Phone Number</label>
            <input type="text" name="phoneNumber" v-model="fields.phoneNumber" />
            <label for="city">City</label>
            <input type="text" name="city" v-model="fields.city" />
            <label for="street">Street</label>
            <input type="text" name="street" v-model="fields.street" />
            <label for="building">Building</label>
            <input type="text" name="building" v-model="fields.building" />
            
            <button type="submit">Update</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            fields: {}
        }
    },
    computed: {
        ...mapGetters(['getToken', 'getUsername'])
    },
    methods: {
        async retrieveData() {
            const res = await axios.post("http://localhost:3000/user/getdata", {token: this.getToken, username: this.getUsername});
            this.fields = res.data;
        },
        async updateData() {
            const form = new FormData(this.$refs.form);
            form.append("token", this.getToken);
            form.append("username", this.getUsername);
            const res = await axios.post('http://localhost:3000/user/setdata', form);
            console.log(res);
        }
    },
    async mounted() {
        await this.retrieveData();
    }
}
</script>