import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Admin from './views/Admin.vue'
import Rooms from './views/Rooms.vue'
import AdminHR from './views/AdminHR.vue'
import AdminDPT from './views/AdminDPT.vue'
import ActivitySchedule from './views/ActivitySchedule.vue'
import Login from './views/Login.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/rooms',
        name: 'Rooms',
        component: Rooms,
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/hr',
        name: 'AdminHR',
        component: AdminHR,
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/dpt',
        name: 'AdminDPT',
        component: AdminDPT,
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/activity',
        name: 'ActivitySchedule',
        component: ActivitySchedule,
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true'
    const userRole = (localStorage.getItem('user_role') || '').toLowerCase()

    if (to.meta.requiresAuth) {
        if (!isAuthenticated) {
            next('/login')
        } else {
            // Role-based protection: HR/SDM requires 'sdm', DPT requires 'dpt'
            if (to.path.includes('/admin/hr') && userRole !== 'sdm') {
                alert('Access Denied: SDM role required.')
                next('/admin')
            } else if (to.path.includes('/admin/dpt') && userRole !== 'dpt') {
                alert('Access Denied: DPT role required.')
                next('/admin')
            } else {
                next()
            }
        }
    } else if (to.name === 'Login' && isAuthenticated) {
        next('/admin')
    } else {
        next()
    }
})

export default router
