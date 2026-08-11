import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Enrollment from '../pages/Enrollment.vue'
import Directory from '../pages/Directory.vue'
import Faqs from '../pages/Faqs.vue'
import AuditSuite from '../pages/AuditSuite.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/enrollment', name: 'Enrollment', component: Enrollment },
  { path: '/directory', name: 'Directory', component: Directory },
  { path: '/faqs', name: 'Faqs', component: Faqs },
  { path: '/audit-suite', name: 'AuditSuite', component: AuditSuite }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
