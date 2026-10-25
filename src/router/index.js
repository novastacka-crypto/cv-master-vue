import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Builder from '../views/Builder.vue'
import Templates from '../views/Templates.vue'
import TemplateDetail from '../views/TemplateDetail.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/builder', name: 'Builder', component: Builder },
  { path: '/templates', name: 'Templates', component: Templates },
  { path: '/templates/:id', name: 'TemplateDetail', component: TemplateDetail },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/Account.vue'),
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
