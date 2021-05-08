import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'

import Layout from "@/components/Layout";
import Home from "@/views/Home";
import Archives from "@/views/Archives";
import Dynamics from "@/views/Dynamics";
import About from "@/views/About";
import LeaveMsg from "@/views/LeaveMsg";
import Login from "@/views/Login";
import BlogDetail from "@/views/BlogDetail";
import EditBlog from "@/views/EditBlog";
import Manager from "@/views/Manager";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        redirect: {
            name: 'home',
        }
    },
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        children: [
            {
                path: '/home',
                name: 'home',
                component: Home
            },
            {
                path: '/archives',
                name: 'archives',
                component: Archives
            },
            {
                path: '/dynamics',
                name: 'dynamics',
                component: Dynamics
            },
            {
                path: '/about',
                name: 'about',
                component: About
            },
            {
                path: '/leavemsg',
                name: 'leavemsg',
                component: LeaveMsg
            },
            {
                path: '/detail/:id',
                name: 'detail',
                component: BlogDetail,
            },
            {
                path: '/detail/:id/edit',
                name: 'editBlog',
                component: EditBlog,
                meta: { requiresAuth: true }
            },
            {
                path: '/blog/add',
                name: 'addBlog',
                component: EditBlog,
                meta: { requiresAuth: true }
            },
            {
                path: '/manager',
                name: '/manager',
                component: Manager,
                meta: { requiresAuth: true }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    store.commit('SET_TOKEN', store.getters.getToken);
    if(store.getters.getToken) {
        store.commit('CHANGE_LOGIN_STATE', true);
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const token = localStorage.getItem("token");
        if(token) {
            if(to.path === '/login') {

            } else {
                next()
            }
        } else {
            next({
                path: '/login'
            })
        }
    } else {
        next()
    }
})

export default router
