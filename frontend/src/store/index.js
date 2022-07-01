import Vuex from 'vuex';
import user from './modules/user';
import cart from './modules/cart';

export default new Vuex.Store({
    modules: {
        user,
        cart
    }
});