<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores'
import { useRouter } from 'vue-router'

const form = ref({
  username: '',
  password: '',
})

const authStore = useAuthStore()
const router = useRouter()

const login = async () => {
  const { username, password } = form.value

  await authStore.setToken(username, password)
  
  if (authStore.state.isLogged) {
    router.push('/')
  } else {
    console.error('Erro ao fazer login')
  }
}

const isPasswordVisible = ref(false)
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" max-width="448">
      <VCardItem class="justify-center">
        <RouterLink to="/" class="d-flex align-center gap-3">
          <Dumbbell />
          <h2 class="font-weight-medium text-2xl text-uppercase">Trainy</h2>
        </RouterLink>
      </VCardItem>

      <VCardText class="pt-2">
        <h4 class="text-h4 mb-1">Bem Vindo ao Trainy! 👋🏻</h4>
        <p class="mb-0">Por favor, faça o login e venha treinar</p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="login">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.username"
                label="Email"
                type="email"
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
              />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap my-6">
                <VCheckbox v-model="form.remember" label="Lembre-me" />
                <a class="text-primary" href="javascript:void(0)">Esqueci Minha Senha</a>
              </div>

              <!-- login button -->
              <VBtn block type="submit">
                Login
              </VBtn>
            </VCol>

            <!-- create account -->
            <VCol cols="12" class="text-center text-base">
              <span>Não tem uma conta?</span>
              <RouterLink class="text-primary ms-2" to="/blank/register">
                Crie Sua Conta
              </RouterLink>
            </VCol>

            <VCol cols="12" class="d-flex align-center">
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol>

            <VCol cols="12" class="text-center">
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
</style>
