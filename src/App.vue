<template>
  <VApp>
    <RouterView />
  </VApp>

  <!-- <VCard class="dev-bar">
    <li
      v-for="route in routes"
      :key="route.path"
    >
      <router-link :to="route.path">
        {{ route.path }}
      </router-link>
    </li>
  </VCard> -->
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const routes = router.getRoutes()
</script>

<style scoped>
.dev-bar {
  position: fixed;
  top: 0;
  right: 0;
  color: white;
  padding: 10px;
  border-radius: 10px 0 0 0;
  z-index: 1000;
  padding: 1rem;
}

.dev-bar ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.dev-bar li {
  margin: 5px 0;
}

.dev-bar a {
  color: white;
  text-decoration: none;
  font-size: 1rem;
}

.dev-bar a:hover {
  text-decoration: underline;
}
</style>
