<script setup>
import { useRoute } from 'vue-router'
import CreateWorkoutMain from '@/components/Workouts/CreateWorkoutMain.vue'
import { Dumbbell } from 'lucide-vue-next'

const route = useRoute()
const activeTab = ref(route.params.tab)

const tabs = [
  {
    title: 'Meus Treinos',
    icon: 'ri-group-line',
    tab: 'my-workouts',
  },
  {
    title: 'Cadastrar Treino',
    icon: Dumbbell,
    tab: 'create-workout',
  },
]
</script>

<template>
  <div>
    <VTabs
      v-model="activeTab"
      show-arrows
      class="v-tabs-pill"
    >
      <VTab
        v-for="item in tabs"
        :key="item.icon"
        :value="item.tab"
      >
        <VIcon
          size="20"
          start
          :icon="item.icon"
        />
        {{ item.title }}
      </VTab>
    </VTabs>

    <VWindow
      v-model="activeTab"
      class="mt-5 disable-tab-transition"
      :touch="false"
    >
      <VWindowItem value="my-workouts"> 
      </VWindowItem>
      
      <VWindowItem value="create-workout"> 
        <CreateWorkoutMain />
      </VWindowItem>
    </VWindow>
  </div>
</template>
