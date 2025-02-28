<script setup>
import { useAuthStore } from '@/stores'
import { computed, onMounted, ref } from 'vue'

const authStore = useAuthStore()
const refInputEl = ref()

// Computed para facilitar o acesso aos dados do usuário
const userData = computed(() => authStore.state.user)

const accountDataLocal = ref({
  name: userData.value.name,
  username: userData.value.username,
  email: userData.value.email,
  profile_picture: userData.value.profile_picture,
})

const imagePreview = ref(userData.value.profile_picture)

const handleImageUpload = event => {
  const file = event.target.files[0]
  if (file) {
    // Preview da imagem
    accountDataLocal.value.profile_picture = URL.createObjectURL(file)
    imagePreview.value = URL.createObjectURL(file)
  }
}

const resetForm = () => {
  accountDataLocal.value = {
    name: userData.value.name,
    username: userData.value.username,
    email: userData.value.email,
    profile_picture: userData.value.profile_picture,
  }
  imagePreview.value = userData.value.profile_picture
}

const handleSubmit = async () => {
  try {
    await authStore.updateProfile(accountDataLocal.value)
    // Atualiza a preview da imagem após o sucesso
    imagePreview.value = authStore.state.user.profile_picture
  } catch (error) {
    console.error('Erro ao atualizar dados:', error)
  }
}

// Carrega os dados do perfil ao montar o componente
onMounted(async () => {
  await authStore.loadProfile()
  resetForm()
})

const timezones = [
  '(GMT-11:00) International Date Line West',
  '(GMT-11:00) Midway Island',
  '(GMT-10:00) Hawaii',
  '(GMT-09:00) Alaska',
  '(GMT-08:00) Pacific Time (US & Canada)',
  '(GMT-08:00) Tijuana',
  '(GMT-07:00) Arizona',
  '(GMT-07:00) Chihuahua',
  '(GMT-07:00) La Paz',
  '(GMT-07:00) Mazatlan',
  '(GMT-07:00) Mountain Time (US & Canada)',
  '(GMT-06:00) Central America',
  '(GMT-06:00) Central Time (US & Canada)',
  '(GMT-06:00) Guadalajara',
  '(GMT-06:00) Mexico City',
  '(GMT-06:00) Monterrey',
  '(GMT-06:00) Saskatchewan',
  '(GMT-05:00) Bogota',
  '(GMT-05:00) Eastern Time (US & Canada)',
  '(GMT-05:00) Indiana (East)',
  '(GMT-05:00) Lima',
  '(GMT-05:00) Quito',
  '(GMT-04:00) Atlantic Time (Canada)',
  '(GMT-04:00) Caracas',
  '(GMT-04:00) La Paz',
  '(GMT-04:00) Santiago',
  '(GMT-03:30) Newfoundland',
  '(GMT-03:00) Brasilia',
  '(GMT-03:00) Buenos Aires',
  '(GMT-03:00) Georgetown',
  '(GMT-03:00) Greenland',
  '(GMT-02:00) Mid-Atlantic',
  '(GMT-01:00) Azores',
  '(GMT-01:00) Cape Verde Is.',
  '(GMT+00:00) Casablanca',
  '(GMT+00:00) Dublin',
  '(GMT+00:00) Edinburgh',
  '(GMT+00:00) Lisbon',
  '(GMT+00:00) London',
]

const currencies = ['USD', 'EUR', 'GBP', 'AUD', 'BRL', 'CAD', 'CNY', 'CZK', 'DKK', 'HKD', 'HUF', 'INR']
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Detalhes da Conta">
        <VCardText class="d-flex">
          <!-- Avatar -->
          <div class="me-6">
            <VAvatar
              rounded="lg"
              size="100"
              :image="imagePreview"
            >
              <VIcon
                v-if="!imagePreview"
                size="48"
                icon="ri-user-line"
                color="primary"
              />
            </VAvatar>
          </div>

          <!-- Upload Photo -->
          <form class="d-flex flex-column justify-center gap-5">
            <div class="d-flex flex-wrap gap-2">
              <VBtn
                color="primary"
                @click="refInputEl?.click()"
              >
                <VIcon
                  icon="ri-upload-cloud-line"
                  class="d-sm-none"
                />
                <span class="d-none d-sm-block">Alterar foto</span>
              </VBtn>

              <input
                ref="refInputEl"
                type="file"
                accept="image/*"
                hidden
                @input="handleImageUpload"
              />
            </div>

            <p class="text-body-1 mb-0">Permitido JPG, PNG. Tamanho máximo de 2MB</p>
          </form>
        </VCardText>

        <VDivider />

        <VCardText>
          <!-- Form -->
          <VForm
            class="mt-6"
            @submit.prevent="handleSubmit"
          >
            <VRow>
              <!-- Nome Completo -->
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="accountDataLocal.name"
                  label="Nome Completo"
                  placeholder="John Doe"
                />
              </VCol>

              <!-- Nome de Usuário -->
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="accountDataLocal.username"
                  label="Nome de Usuário"
                  placeholder="johndoe"
                  disabled
                />
              </VCol>

              <!-- Email -->
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="accountDataLocal.email"
                  label="E-mail"
                  placeholder="johndoe@email.com"
                  type="email"
                />
              </VCol>

              <!-- Botões -->
              <VCol
                cols="12"
                class="d-flex gap-4"
              >
                <VBtn
                  type="submit"
                  color="primary"
                >
                  Salvar Alterações
                </VBtn>

                <VBtn
                  color="secondary"
                  variant="outlined"
                  @click="resetForm"
                >
                  Cancelar
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss" scoped>
.v-card-text {
  .v-avatar {
    border: 2px solid rgb(var(--v-theme-primary));
  }
}
</style>
