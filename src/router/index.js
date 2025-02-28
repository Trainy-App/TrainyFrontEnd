const routes = [
  {
    path: '/account-settings',
    name: 'account-settings',
    component: () => import('@/views/pages/account-settings/AccountSettings.vue'),
    meta: {
      requiresAuth: true,
      layout: 'default',
      title: 'Configurações da Conta',
    },
  },
]
