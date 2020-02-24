import Vue from 'vue'
import Vuex from 'vuex'
import storeAuth from './modules/auth'
import storeProduct from './modules/product'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        storeAuth,
        storeProduct,
    }
});

export default store;
