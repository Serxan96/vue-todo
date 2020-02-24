import axios from 'axios'
import {router} from '../../router'

const requestUrl = 'https://vue-todo-caacf.firebaseio.com';

const state = {
    products: [],
    productDetail: {},
};

const getters = {
    getProducts(state){
        return state.products.slice().reverse();
    },

    getProductDetail(state){
        return state.productDetail;
    }
};

const mutations = {
    setProducts(state, product){
        state.products = product;
    },

    setProduct(state, product){
        state.products.push(product);
    },

    setProductDetail(state, product){
        state.productDetail = product;
    },
};

const actions = {
    initApp(context){
        axios.get(`${requestUrl}/products.json`)
            .then(res => {
                let products = [],
                    data = res.data;

                for(let key in data){
                    data[key].key = key;
                    products.push(data[key]);
                }

                context.commit('setProducts', products)
            })
    },

    saveProduct(context, product){
        axios.post(`${requestUrl}/products.json`, {
            name: product.name,
            price: product.price,
            desc: product.desc,
        }).then(res => {
            product.key = res.data.name;
            context.commit('setProduct', product);
            router.push('/');
        })
    },

    fetchProductDetail(context, productID){
        axios.get(`${requestUrl}/products/${productID}.json`)
            .then(res => {
                context.commit('setProductDetail', res.data)
            })
    },

    removeProduct(context, product){
        axios.delete(`${requestUrl}/products/${product.key}.json`)
            .then(res => {
                // remove product
            })
    },

    editProduct(context, product){
        axios.patch(`${requestUrl}/products/${product.key}.json`, {
            name: product.name,
            price: product.price,
            desc: product.desc,
        }).then(res => {
            router.push('/');
        })
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
};
