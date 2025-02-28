<script setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import { useAuthStore } from '@/stores'
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue' /* PartiallyEnd: #3632/scriptSetup.vue */
import { computed } from 'vue'

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.state.isLogged)
</script>

<template>
  <!-- 👉 Dashboards -->
  <VerticalNavGroup
    :item="{
      title: 'Dashboards',
      icon: 'ri-home-smile-line',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Dashboard',
        to: { name: 'dashboard' },
      }"
    />
  </VerticalNavGroup>

  <!-- 👉 Apps & Pages -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Apps & Pages',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Configurações da Conta',
      icon: 'ri-user-settings-line',
      to: { name: 'account-settings' },
    }"
  />

  <VerticalNavLink
    v-if="!isAuthenticated"
    :item="{
      title: 'Login',
      icon: 'ri-login-box-line',
      to: { name: 'login' },
    }"
  />
  <VerticalNavLink
    v-if="!isAuthenticated"
    :item="{
      title: 'Registro',
      icon: 'ri-user-add-line',
      to: { name: 'register' },
    }"
  />

  <!-- 👉 User Interface -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Interface do Usuário',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Tipografia',
      icon: 'ri-text',
      to: { name: 'typography' },
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Ícones',
      icon: 'ri-remixicon-line',
      to: { name: 'icons' },
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Cards',
      icon: 'ri-bar-chart-box-line',
      to: { name: 'cards' },
    }"
  />

  <!-- 👉 Forms & Tables -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Formulários & Tabelas',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Layouts de Formulário',
      icon: 'ri-layout-4-line',
      to: { name: 'form-layouts' },
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Tabelas',
      icon: 'ri-table-alt-line',
      to: { name: 'tables' },
    }"
  />

  <!-- 👉 Others -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Others',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Documentation',
      icon: 'ri-article-line',
      href: 'https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/documentation/',
      target: '_blank',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Raise Support',
      href: 'https://github.com/themeselection/materio-vuetify-vuejs-admin-template-free/issues',
      icon: 'ri-lifebuoy-line',
      target: '_blank',
    }"
  />
</template>
