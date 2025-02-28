<script setup>
import { ref } from 'vue'
import AccountSettingsAccount from './AccountSettingsAccount.vue'
import AccountSettingsNotification from './AccountSettingsNotification.vue'
import AccountSettingsSecurity from './AccountSettingsSecurity.vue'

const currentTab = ref(0)

const tabs = [
  {
    title: 'Conta',
    icon: 'mdi-account-outline',
    component: AccountSettingsAccount,
  },
  {
    title: 'Segurança',
    icon: 'mdi-lock-outline',
    component: AccountSettingsSecurity,
  },
  {
    title: 'Notificações',
    icon: 'mdi-bell-outline',
    component: AccountSettingsNotification,
  },
]
</script>

<template>
  <VCard flat>
    <VTabs
      v-model="currentTab"
      grow
      class="v-tabs-pill"
    >
      <VTab
        v-for="tab in tabs"
        :key="tab.title"
        :value="tabs.indexOf(tab)"
      >
        <VIcon
          :icon="tab.icon"
          class="me-2"
          size="18"
        />
        {{ tab.title }}
      </VTab>
    </VTabs>

    <VDivider />

    <VCardText>
      <VWindow v-model="currentTab">
        <VWindowItem
          v-for="tab in tabs"
          :key="tab.title"
          :value="tabs.indexOf(tab)"
        >
          <Component :is="tab.component" />
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.v-tabs-pill {
  .v-tab {
    border-radius: 0.25rem;
    margin: 0.25rem;
    min-width: 0;
    padding: 0.5rem 1rem;

    &.v-tab--selected {
      background-color: rgb(var(--v-theme-primary));
      color: rgb(var(--v-theme-on-primary));
    }
  }
}
</style>
