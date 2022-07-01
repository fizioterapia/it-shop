<template>
    <div>
                <p v-if="showError  == true">{{error}}</p>

        <form @submit.prevent="submit">
            <input type="text" name="login" placeholder="Login" v-model="form.login" />
            <input type="text" name="email" placeholder="Email" v-model="form.email" />
            <input type="password" name="password" placeholder="Password" v-model="form.password" />
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        data() {
            return {
                form: {
                    login: "",
                    email: "",
                    password: ""
                },
                error: "",
                showError: false
            }
        },
        methods: {
            ...mapActions(['Register']),
            async submit() {
                const user = {
                    login: this.form.login,
                    email: this.form.email,
                    password: this.form.password
                }
                
                try {
                    await this.Register(user);
                    this.$router.push("/");
                } catch(e) {
                    this.error = e;
                    this.showError = true;
                }
            }
        }
    }
</script>