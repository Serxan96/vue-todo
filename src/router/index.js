import Vue from 'vue'
import Router from 'vue-router'

// Components
import Home from '../pages/Home'
import AddProduct from '../pages/AddProduct'
import EditProduct from '../pages/EditProduct'
import ProductDetail from '../pages/ProductDetail'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'

// Store
import store from '../store/index'

Vue.use(Router);

export const router = new Router({
    routes: [
        {
            path: '/',
            component: Home,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/add',
            component: AddProduct,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/edit/:id',
            name: 'Edit',
            component: EditProduct,
            props: true,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/product/:id',
            component: ProductDetail,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                requiresVisitor: true
            }
        },
        {
            path: '/register',
            component: Register,
            meta: {
                requiresVisitor: true
            }
        },
        {
            path: '*',
            redirect: '/'
        }
    ],
    mode: 'history',
    linkActiveClass: "active",
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    },
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.loggedIn) {
            next('/login')
        }
        else {
            next()
        }
    }
    else if (to.matched.some(record => record.meta.requiresVisitor)) {
        if (store.getters.loggedIn) {
            next('/')
        }
        else {
            next()
        }
    }
});
