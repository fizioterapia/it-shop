import axios from 'axios';

const state = {
    jwt: "",
    username: ""
};
const getters = {
    getToken: (state) => (state.jwt),
    getUsername: (state) => (state.username)
};
const actions = {
    async Login({commit}, user) {
        console.log(user);
        const res = await axios.post('http://localhost:3000/user/login', user);
        if (res.data.error) throw res.data.error;

        if (res.data.token) {
            await commit('setToken', res.data.token);
            await commit('setUsername', user.login);
        }
    },
    async Logout({commit}) {
        await commit('setToken', '');
        await commit('setUsername', '');
    }
};
const mutations = {
    setToken(state, token) {
        state.jwt = token
    },
    setUsername(state, username) {
        state.username = username;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}