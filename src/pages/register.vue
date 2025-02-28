<script setup>
import { useAuthStore } from '@/stores'
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import { Dumbbell } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  username: '',
  name: '',
  email: '',
  password: '',
  profile_picture: null,
  privacyPolicies: false,
})

const vuetifyTheme = useTheme()
const imagePreview = ref(null)
const fileInputRef = ref(null)

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})

const handleImageClick = () => {
  fileInputRef.value.$el.querySelector('input').click()
}

const handleImageUpload = file => {
  if (file) {
    if (file instanceof File) {
      form.value.profile_picture = file
      imagePreview.value = URL.createObjectURL(file)
    } else {
      form.value.profile_picture = null
      imagePreview.value = null
      authStore.state.error = true
      authStore.state.errorMessage = 'Por favor, selecione um arquivo de imagem válido'
    }
  } else {
    form.value.profile_picture = null
    imagePreview.value = null
  }
  authStore.clearError()
}

const isPasswordVisible = ref(false)

const handleRegister = async () => {
  if (!form.value.privacyPolicies) {
    return
  }

  if (!form.value.profile_picture) {
    authStore.state.error = true
    authStore.state.errorMessage = 'Por favor, selecione uma foto de perfil'
    return
  }

  await authStore.regiter(form.value)

  if (authStore.state.isLogged) {
    router.push('/')
  }
}
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->

  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <RouterLink
          to="/"
          class="d-flex align-center gap-3"
        >
          <!-- eslint-disable vue/no-v-html -->
          <Dumbbell />
          <h2 class="font-weight-medium text-2xl text-uppercase">Trainy</h2>
        </RouterLink>
      </VCardItem>

      <VCardText class="pt-2">
        <h4 class="text-h4 mb-1">Seu Treino Está Aqui 🚀</h4>
        <p class="mb-0">Faça o monitoramento do seu treino aqui!</p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="handleRegister">
          <VRow>
            <!-- Profile Picture -->
            <VCol
              cols="12"
              class="text-center"
            >
              <div
                class="profile-upload-container d-flex flex-column align-center"
                @click="handleImageClick"
                :class="{ 'has-error': authStore.state.error && authStore.state.errorMessage.includes('imagem') }"
              >
                <VAvatar
                  size="120"
                  :image="imagePreview"
                  class="profile-avatar"
                >
                  <VIcon
                    v-if="!imagePreview"
                    size="48"
                    icon="ri-user-line"
                    color="primary"
                  />
                </VAvatar>

                <div class="upload-overlay d-flex flex-column align-center justify-center">
                  <VIcon
                    icon="ri-camera-line"
                    color="primary"
                    size="24"
                    class="mb-1"
                  />
                  <span class="text-primary text-caption">{{ imagePreview ? 'Alterar foto' : 'Adicionar foto' }}</span>
                </div>

                <VFileInput
                  ref="fileInputRef"
                  v-model="form.profile_picture"
                  accept="image/*"
                  :disabled="authStore.state.isLoading"
                  @update:model-value="handleImageUpload"
                  hide-details
                  class="d-none"
                />
              </div>

              <VSlideYTransition>
                <p
                  v-if="authStore.state.error && authStore.state.errorMessage.includes('imagem')"
                  class="text-error text-caption mt-2"
                >
                  {{ authStore.state.errorMessage }}
                </p>
              </VSlideYTransition>
            </VCol>
            <!-- Name -->
            <VCol cols="12">
              <VTextField
                v-model="form.name"
                label="Nome Completo"
                placeholder="John Doe"
                :error-messages="authStore.state.error ? authStore.state.errorMessage : ''"
                :disabled="authStore.state.isLoading"
                @update:model-value="authStore.clearError"
              />
            </VCol>
            <!-- Username -->
            <VCol cols="12">
              <VTextField
                v-model="form.username"
                label="Nome de Usuário"
                placeholder="johndoe"
                :error-messages="authStore.state.error ? authStore.state.errorMessage : ''"
                :disabled="authStore.state.isLoading"
                @update:model-value="authStore.clearError"
              />
            </VCol>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                label="Email"
                placeholder="johndoe@email.com"
                type="email"
                :error-messages="authStore.state.error ? authStore.state.errorMessage : ''"
                :disabled="authStore.state.isLoading"
                @update:model-value="authStore.clearError"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                autocomplete="password"
                :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
                :error-messages="authStore.state.error ? authStore.state.errorMessage : ''"
                :disabled="authStore.state.isLoading"
                @update:model-value="authStore.clearError"
              />
              <div class="d-flex align-center my-6">
                <VCheckbox
                  id="privacy-policy"
                  v-model="form.privacyPolicies"
                  inline
                />
                <VLabel
                  for="privacy-policy"
                  style="opacity: 1"
                >
                  <span class="me-1">Eu aceito os</span>
                  <a
                    href="javascript:void(0)"
                    class="text-primary"
                    >termos de politica e privacidade</a
                  >
                </VLabel>
              </div>

              <VBtn
                block
                type="submit"
                :loading="authStore.state.isLoading"
                :disabled="!form.privacyPolicies"
              >
                Sign up
              </VBtn>
            </VCol>

            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>Já tem uma conta?</span>
              <RouterLink
                class="text-primary ms-2"
                to="/login"
                >Faça o Login
              </RouterLink>
            </VCol>

            <VCol
              cols="12"
              class="d-flex align-center"
            >
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol>

            <!-- auth providers -->
            <VCol
              cols="12"
              class="text-center"
            >
              <AuthProvider />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use '@core/scss/template/pages/page-auth';

.profile-upload-container {
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 8px;
  border-radius: 50%;

  &:hover {
    .upload-overlay {
      opacity: 1;
    }

    .profile-avatar {
      opacity: 0.7;
    }
  }

  &.has-error {
    .profile-avatar {
      border: 2px solid rgb(var(--v-theme-error));
    }
  }
}

.profile-avatar {
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: scale(1.02);
  }
}

.upload-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all 0.3s ease;
  background: rgba(var(--v-theme-surface), 0.8);
  padding: 8px 16px;
  border-radius: 8px;
  backdrop-filter: blur(4px);
}
</style>
