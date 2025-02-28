<script setup>
import UserService from '@/services/auth/user.service'
import { ref } from 'vue'

const loading = ref(false)
const success = ref(false)
const error = ref('')

const notifications = ref({
  email: {
    news: true,
    accountActivity: true,
    newWorkouts: true,
    promotions: false,
  },
  push: {
    news: false,
    accountActivity: true,
    newWorkouts: true,
    promotions: false,
  },
})

const handleSave = async () => {
  try {
    loading.value = true
    error.value = ''
    success.value = false

    await UserService.updateNotifications(notifications.value)
    success.value = true
  } catch (err) {
    error.value = 'Erro ao salvar configurações. Tente novamente.'
    console.error('Erro:', err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <VCard>
    <VCardText>
      <!-- Email Notifications -->
      <VRow>
        <VCol cols="12">
          <h6 class="text-h6 mb-4">Notificações por Email</h6>

          <VRow>
            <VCol
              cols="12"
              sm="6"
            >
              <VCheckbox
                v-model="notifications.email.news"
                label="Novidades e Atualizações"
                density="comfortable"
              />
              <VCheckbox
                v-model="notifications.email.accountActivity"
                label="Atividades da Conta"
                density="comfortable"
              />
            </VCol>

            <VCol
              cols="12"
              sm="6"
            >
              <VCheckbox
                v-model="notifications.email.newWorkouts"
                label="Novos Treinos"
                density="comfortable"
              />
              <VCheckbox
                v-model="notifications.email.promotions"
                label="Promoções e Ofertas"
                density="comfortable"
              />
            </VCol>
          </VRow>
        </VCol>

        <VDivider class="my-3" />

        <!-- Push Notifications -->
        <VCol cols="12">
          <h6 class="text-h6 mb-4">Notificações Push</h6>

          <VRow>
            <VCol
              cols="12"
              sm="6"
            >
              <VCheckbox
                v-model="notifications.push.news"
                label="Novidades e Atualizações"
                density="comfortable"
              />
              <VCheckbox
                v-model="notifications.push.accountActivity"
                label="Atividades da Conta"
                density="comfortable"
              />
            </VCol>

            <VCol
              cols="12"
              sm="6"
            >
              <VCheckbox
                v-model="notifications.push.newWorkouts"
                label="Novos Treinos"
                density="comfortable"
              />
              <VCheckbox
                v-model="notifications.push.promotions"
                label="Promoções e Ofertas"
                density="comfortable"
              />
            </VCol>
          </VRow>
        </VCol>

        <!-- Error/Success Messages -->
        <VCol
          v-if="error || success"
          cols="12"
        >
          <VAlert
            :color="success ? 'success' : 'error'"
            variant="tonal"
            class="mb-4"
          >
            {{ success ? 'Configurações salvas com sucesso!' : error }}
          </VAlert>
        </VCol>

        <!-- Save Button -->
        <VCol cols="12">
          <VBtn
            color="primary"
            :loading="loading"
            @click="handleSave"
          >
            Salvar Preferências
          </VBtn>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.v-checkbox {
  margin-bottom: 8px;
}
</style>
