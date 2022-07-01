const findItem = (itemId, cart) => {
    for(let i = 0; i < cart.length; i++) {
        if (cart[i].itemId == itemId) {
            return i;
        }
    }

    return -1;
}

const state = {
    cartItems: [],
    cartItemsCount: 0
};

const getters = {
    getCart: (state) => (state.cartItems),
    getCartAmount: (state) => (state.cartItemsCount)
};

const actions = {
    addToCart({commit}, itemId) {
        commit('addToCart', itemId);
    },
    removeFromCart({commit}, itemId) {
        commit('removeFromCart', itemId);
    }
};

const mutations = {
    addToCart(state, item) {
        let itemId = findItem(item, state.cartItems);

        if (itemId == -1) {
            state.cartItems.push({
                itemId: item,
                count: 1
            })
        } else {
            state.cartItems[itemId].count = state.cartItems[itemId].count + 1
        }

        state.cartItemsCount++;
    },
    removeFromCart(state, item) {
        let itemId = findItem(item, state.cartItems);

        if (itemId >= 0) {
            state.cartItems[itemId].count = state.cartItems[itemId].count - 1;

            if (state.cartItems[itemId].count <= 0) {
                delete state.cartItems[itemId];
            }

            state.cartItemsCount--;
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}