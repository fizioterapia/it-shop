<template>
    <div>
        <p v-if="showError  == true">{{error}}</p>

        <form @submit.prevent="submit">
            <input type="text" name="login" v-model="form.login" />
            <input type="password" name="password" v-model="form.password" />
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
    import { mapActions } from "vuex";

    export default {
        data() {
            return {
                form: {
                    login: "",
                    password: ""
                },
                error: "",
                showError: false
            }
        },
        methods: {
            ...mapActions(["Login"]),
            async submit() {
                const user = {
                    login: this.form.login,
                    password: this.form.password
                }
                
                try {
                    await this.Login(user);
                    this.$router.push("/");
                } catch(e) {
                    this.error = e;
                    this.showError = true;
                }
            }
        }
    }
</script>