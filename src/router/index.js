// 导入 createRouter 和 createWebHashHistory 函数
import { createRouter, createWebHashHistory } from 'vue-router'

// 定义路由配置
const routes = [
  {
    path: '/',
    name: 'MedicalBigDataHome',
    component: () => import('@/views/medical-big-data-home/medical-big-data-home.vue'),
  }
]

// 创建路由实例，使用哈希历史模式
const router = createRouter({
  // 使用哈希历史模式
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

// 导出路由实例
export default router