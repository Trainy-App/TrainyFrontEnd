<script setup>
import UserService from '@/services/auth/user.service'
import { useAuthStore } from '@/stores'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const deleteAccountForm = ref({
  password: '',
  confirmDelete: false,
})

const isCurrentPasswordVisible = ref(false)
const isNewPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const error = ref('')
const success = ref('')
const loading = ref(false)

const resetPasswordForm = () => {
  passwordForm.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  }
  error.value = ''
  success.value = ''
}

const handleChangePassword = async () => {
  try {
    error.value = ''
    success.value = ''
    loading.value = true

    // Validações
    if (!passwordForm.value.currentPassword || !passwordForm.value.newPassword || !passwordForm.value.confirmPassword) {
      error.value = 'Todos os campos são obrigatórios'
      return
    }

    if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
      error.value = 'As senhas não coincidem'
      return
    }

    if (passwordForm.value.newPassword.length < 8) {
      error.value = 'A nova senha deve ter pelo menos 8 caracteres'
      return
    }

    await UserService.changePassword({
      currentPassword: passwordForm.value.currentPassword,
      newPassword: passwordForm.value.newPassword,
    })

    success.value = 'Senha alterada com sucesso!'
    resetPasswordForm()
  } catch (err) {
    error.value = err.old_password || err.new_password || 'Erro ao alterar senha. Tente novamente.'
  } finally {
    loading.value = false
  }
}

const handleDeleteAccount = async () => {
  try {
    error.value = ''
    loading.value = true

    if (!deleteAccountForm.value.password) {
      error.value = 'Digite sua senha para confirmar'
      return
    }

    if (!deleteAccountForm.value.confirmDelete) {
      error.value = 'Você precisa confirmar que deseja excluir sua conta'
      return
    }

    await UserService.deleteAccount()
    await authStore.logout()
    router.push('/login')
  } catch (err) {
    error.value = err.password || 'Erro ao excluir conta. Tente novamente.'
  } finally {
    loading.value = false
  }
}

const passwordRequirements = [
  'Minimum 8 characters long - the more, the better',
  'At least one lowercase character',
  'At least one number, symbol, or whitespace character',
]

const serverKeys = [
  {
    name: 'Server Key 1',
    key: '23eaf7f0-f4f7-495e-8b86-fad3261282ac',
    createdOn: '28 Apr 2021, 18:20 GTM+4:10',
    permission: 'Full Access',
  },
  {
    name: 'Server Key 2',
    key: 'bb98e571-a2e2-4de8-90a9-2e231b5e99',
    createdOn: '12 Feb 2021, 10:30 GTM+2:30',
    permission: 'Read Only',
  },
  {
    name: 'Server Key 3',
    key: '2e915e59-3105-47f2-8838-6e46bf83b711',
    createdOn: '28 Dec 2020, 12:21 GTM+4:10',
    permission: 'Full Access',
  },
]

const recentDevicesHeaders = [
  {
    title: 'BROWSER',
    key: 'browser',
  },
  {
    title: 'DEVICE',
    key: 'device',
  },
  {
    title: 'LOCATION',
    key: 'location',
  },
  {
    title: 'RECENT ACTIVITY',
    key: 'recentActivity',
  },
]

const recentDevices = [
  {
    browser: 'Chrome on Windows',
    device: 'HP Spectre 360',
    location: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: {
      icon: 'ri-macbook-line',
      color: 'primary',
    },
  },
  {
    browser: 'Chrome on iPhone',
    device: 'iPhone 12x',
    location: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: {
      icon: 'ri-android-line',
      color: 'error',
    },
  },
  {
    browser: 'Chrome on Android',
    device: 'Oneplus 9 Pro',
    location: 'San Francisco, CA',
    recentActivity: '16 Apr 2022, 04:20',
    deviceIcon: {
      icon: 'ri-smartphone-line',
      color: 'success',
    },
  },
  {
    browser: 'Chrome on macOS',
    device: 'Apple iMac',
    location: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: {
      icon: 'ri-mac-line',
      color: 'secondary',
    },
  },
  {
    browser: 'Chrome on Windows',
    device: 'HP Spectre 360',
    location: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: {
      icon: 'ri-macbook-line',
      color: 'primary',
    },
  },
  {
    browser: 'Chrome on Android',
    device: 'Oneplus 9 Pro',
    location: 'San Francisco, CA',
    recentActivity: '16 Apr 2022, 04:20',
    deviceIcon: {
      icon: 'ri-android-line',
      color: 'success',
    },
  },
]
</script>

<template>
  <VRow>
    <!-- Alterar Senha -->
    <VCol cols="12">
      <VCard title="Alterar Senha">
        <VCardText>
          <VForm @submit.prevent="handleChangePassword">
            <VRow>
              <!-- Senha Atual -->
              <VCol cols="12">
                <VTextField
                  v-model="passwordForm.currentPassword"
                  :type="isCurrentPasswordVisible ? 'text' : 'password'"
                  label="Senha Atual"
                  :append-inner-icon="isCurrentPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                  @click:append-inner="isCurrentPasswordVisible = !isCurrentPasswordVisible"
                  :error-messages="error"
                />
              </VCol>

              <!-- Nova Senha -->
              <VCol cols="12">
                <VTextField
                  v-model="passwordForm.newPassword"
                  :type="isNewPasswordVisible ? 'text' : 'password'"
                  label="Nova Senha"
                  :append-inner-icon="isNewPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                  @click:append-inner="isNewPasswordVisible = !isNewPasswordVisible"
                />
              </VCol>

              <!-- Confirmar Nova Senha -->
              <VCol cols="12">
                <VTextField
                  v-model="passwordForm.confirmPassword"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  label="Confirmar Nova Senha"
                  :append-inner-icon="isConfirmPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                  @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                />
              </VCol>

              <!-- Mensagem de Sucesso -->
              <VCol
                v-if="success"
                cols="12"
              >
                <VAlert
                  color="success"
                  variant="tonal"
                >
                  {{ success }}
                </VAlert>
              </VCol>

              <!-- Botões -->
              <VCol cols="12">
                <VBtn
                  type="submit"
                  :loading="loading"
                >
                  Alterar Senha
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <!-- Excluir Conta -->
    <VCol cols="12">
      <VCard
        title="Excluir Conta"
        color="error"
        variant="outlined"
      >
        <VCardText>
          <p class="mb-4">
            Ao excluir sua conta, todos os seus dados serão permanentemente removidos. Esta ação não pode ser desfeita.
          </p>

          <VForm @submit.prevent="handleDeleteAccount">
            <VRow>
              <!-- Senha -->
              <VCol cols="12">
                <VTextField
                  v-model="deleteAccountForm.password"
                  type="password"
                  label="Digite sua senha para confirmar"
                  :error-messages="error"
                />
              </VCol>

              <!-- Confirmação -->
              <VCol cols="12">
                <VCheckbox
                  v-model="deleteAccountForm.confirmDelete"
                  label="Eu confirmo que desejo excluir permanentemente minha conta"
                  color="error"
                />
              </VCol>

              <!-- Botão -->
              <VCol cols="12">
                <VBtn
                  type="submit"
                  color="error"
                  :loading="loading"
                  :disabled="!deleteAccountForm.confirmDelete"
                >
                  Excluir Conta
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <!-- SECTION: Create an API key -->
    <VCol cols="12">
      <VCard title="Create an API key">
        <VRow>
          <!-- 👉 Choose API Key -->
          <VCol
            cols="12"
            md="5"
            order-md="0"
            order="1"
          >
            <VCardText>
              <VForm @submit.prevent="() => {}">
                <VRow>
                  <!-- 👉 Choose API Key -->
                  <VCol cols="12">
                    <VSelect
                      label="Choose the API key type you want to create"
                      placeholder="Select API key type"
                      :items="[
                        'Full Control',
                        'Modify',
                        'Read & Execute',
                        'List Folder Contents',
                        'Read Only',
                        'Read & Write',
                      ]"
                    />
                  </VCol>

                  <!-- 👉 Name the API Key -->
                  <VCol cols="12">
                    <VTextField
                      label="Name the API key"
                      placeholder="Name the API key"
                    />
                  </VCol>

                  <!-- 👉 Create Key Button -->
                  <VCol cols="12">
                    <VBtn
                      type="submit"
                      block
                    >
                      Create Key
                    </VBtn>
                  </VCol>
                </VRow>
              </VForm>
            </VCardText>
          </VCol>
        </VRow>
      </VCard>
    </VCol>

    <VCol cols="12">
      <!-- SECTION: API Keys List -->
      <VCard title="API Key List &amp; Access">
        <VCardText>
          An API key is a simple encrypted string that identifies an application without any principal. They are useful
          for accessing public data anonymously, and are used to associate API requests with your project for quota and
          billing.
        </VCardText>

        <!-- 👉 Server Status -->
        <VCardText class="d-flex flex-column gap-y-4">
          <div
            v-for="serverKey in serverKeys"
            :key="serverKey.key"
            class="bg-var-theme-background pa-4"
          >
            <div class="d-flex align-center flex-wrap mb-3">
              <h6 class="text-h6 mb-0 me-3">
                {{ serverKey.name }}
              </h6>
              <VChip
                color="primary"
                size="small"
              >
                {{ serverKey.permission }}
              </VChip>
            </div>
            <p class="text-base font-weight-medium">
              <span class="me-3">{{ serverKey.key }}</span>
              <VIcon
                :size="18"
                icon="ri-file-copy-line"
                class="cursor-pointer"
              />
            </p>
            <span>Created on {{ serverKey.createdOn }}</span>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <!-- SECTION Recent Devices -->
    <VCol cols="12">
      <!-- 👉 Table -->
      <VCard title="Recent Devices">
        <VDataTable
          :headers="recentDevicesHeaders"
          :items="recentDevices"
          hide-default-footer
          class="text-no-wrap"
        >
          <template #item.browser="{ item }">
            <div class="d-flex">
              <VIcon
                start
                :icon="item.deviceIcon.icon"
                :color="item.deviceIcon.color"
              />
              <span>
                {{ item.browser }}
              </span>
            </div>
          </template>
          <!-- TODO Refactor this after vuetify provides proper solution for removing default footer -->
          <template #bottom />
        </VDataTable>
      </VCard>
    </VCol>
  </VRow>
</template>
