import axios from 'axios'
import {router} from '../../router'

const tokenKey = 'todo_ID_token';

const state = {
    token: localStorage.getItem(tokenKey) || null,
    api_key: 'AIzaSyC_twEKqUjLSXfqPB7je1da5MOYqG_a2vY',
    message: null,
};

const getters = {
    loggedIn(state){
        return state.token !== null
    },

    getMessage(state){
        return state.message
    }
};

const mutations = {
    setToken(state, token){
        state.token = token;
    },

    clearToken(state){
        state.token = null;
    },

    setMessage(state, message){
        state.message = message;
    }
};

const actions = {
    loginRegister(context, userData){
        let authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
        if(userData.type === 'register'){
            authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
        }

        return new Promise(((resolve, reject) => {
            axios.post(authUrl + context.state.api_key, {
                email: userData.email,
                password: userData.password,
                returnSecureToken: true
            }).then(res => {
                context.commit('setToken', res.data.idToken);
                localStorage.setItem(tokenKey, res.data.idToken);
                router.push('/');
            }).catch(e => {
                context.commit('setMessage', e.response.data.error);
                reject();
            })
        }))
    },

    logout({commit}){
        commit('clearToken');
        localStorage.removeItem(tokenKey);
        router.push('/login');
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
};
