import { createRouter, createWebHistory } from 'vue-router'
import LoginPanel from '@/views/LoginPanel.vue';
import AdminPanel from '@/views/AdminPanel.vue';
import TeacherPanel from '@/views/TeacherPanel.vue';
import StudentPanel from '@/views/StudentPanel.vue';
// 假设这些子组件已经存在
import AdminFunction1 from '@/views/admin/Function1.vue';
import AdminFunction2 from '@/views/admin/Function2.vue';
import AdminFunction3 from '@/views/admin/Function3.vue';
import TeacherFunction1 from '@/views/teacher/Function1.vue';
import TeacherFunction2 from '@/views/teacher/Function2.vue';
import TeacherFunction3 from '@/views/teacher/Function3.vue';
import StudentFunction1 from '@/views/student/Function1.vue';
import StudentFunction2 from '@/views/student/Function2.vue';
import StudentFunction3 from '@/views/student/Function3.vue';

const routes = [
  {
    path: '/',
    name: 'LoginPanel',
    component: LoginPanel
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    component: AdminPanel,
    children: [
      { path: 'function1', component: AdminFunction1 },
      { path: 'function2', component: AdminFunction2 },
      { path: 'function3', component: AdminFunction3 },
    ]
  },
  {
    path: '/teacher',
    name: 'TeacherPanel',
    component: TeacherPanel,
    children: [
      { path: 'function1', component: TeacherFunction1 },
      { path: 'function2', component: TeacherFunction2 },
      { path: 'function3', component: TeacherFunction3 },
    ]
  },
  {
    path: '/student',
    name: 'StudentPanel',
    component: StudentPanel,
    children: [
      { path: 'function1', component: StudentFunction1 },
      { path: 'function2', component: StudentFunction2 },
      { path: 'function3', component: StudentFunction3 },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router