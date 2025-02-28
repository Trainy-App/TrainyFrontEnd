export const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/pages/dashboard.vue'),
        meta: { title: 'Dashboard' },
      },
      {
        path: 'account-settings',
        name: 'account-settings',
        component: () => import('@/pages/account-settings.vue'),
        meta: { title: 'Configurações da Conta' },
      },
      {
        path: 'typography',
        name: 'typography',
        component: () => import('@/pages/typography.vue'),
        meta: { title: 'Tipografia' },
      },
      {
        path: 'icons',
        name: 'icons',
        component: () => import('@/pages/icons.vue'),
        meta: { title: 'Ícones' },
      },
      {
        path: 'cards',
        name: 'cards',
        component: () => import('@/pages/cards.vue'),
        meta: { title: 'Cards' },
      },
      {
        path: 'tables',
        name: 'tables',
        component: () => import('@/pages/tables.vue'),
        meta: { title: 'Tabelas' },
      },
      {
        path: 'form-layouts',
        name: 'form-layouts',
        component: () => import('@/pages/form-layouts.vue'),
        meta: { title: 'Layouts de Formulário' },
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/blank.vue'),
    meta: { isGuest: true },
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/pages/login.vue'),
        meta: { title: 'Login' },
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/pages/register.vue'),
        meta: { title: 'Registro' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/[...error].vue'),
    meta: { title: 'Página não encontrada' },
  },
]
