import axios from 'axios';

const state = {
    jwt: "",
    username: "",
    admin: false
};
const getters = {
    getToken: (state) => (state.jwt),
    getUsername: (state) => (state.username),
    isAdmin: (state) => (state.admin),
    isAuthenticated: (state) => (!!state.username),
};
const actions = {
    async Validate({getters, dispatch}) {
        const res = await axios.post('http://localhost:3000/user/validate', {token: getters.getToken});

        if(res.data == false) {
            dispatch('Logout');
        }

    },
    async Login({commit}, user) {
        const res = await axios.post('http://localhost:3000/user/login', user);
        if (res.data.error) throw res.data.error;

        if (res.data.token) {
            await commit('setToken', res.data.token);
            await commit('setUsername', user.login);
            await commit('setAdmin', res.data.admin);
        }
    },
    async Register({commit}, user) {
        const res = await axios.post('http://localhost:3000/user/register', user);
        if (res.data.error) throw res.data.error;

        if (res.data.token) {
            await commit('setToken', res.data.token);
            await commit('setUsername', user.login);
            await commit('setAdmin', res.data.admin);
        }
    },
    async Logout({commit}) {
        await commit('setToken', '');
        await commit('setUsername', '');
        await commit('setAdmin', false);
    }
};
const mutations = {
    setToken(state, token) {
        state.jwt = token
    },
    setUsername(state, username) {
        state.username = username;
    },
    setAdmin(state, admin) {
        state.admin = admin;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}