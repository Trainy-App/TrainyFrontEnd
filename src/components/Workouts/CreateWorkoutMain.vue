<script setup>
import { Trash, Save, XCircle, BicepsFlexed, Dumbbell } from 'lucide-vue-next'
import { ref, computed, onMounted, watch } from 'vue'
import { useMusclesStore, useExerciciesStore } from '@/stores'

const musclesStore = useMusclesStore()
const exercisesStore = useExerciciesStore()

const workout = ref({
  name: '',
  description: '',
  date: new Date().toISOString().split('T')[0],
  athlete: 5,
  divisions: [],
})

const numDivisions = ref(1)
const showDivisionInput = ref(true) // Controla a exibição do input de divisões

const exercises = ref([
  { id: 1, name: 'Supino' },
  { id: 2, name: 'Rosca Direta' },
  { id: 3, name: 'Agachamento' },
  { id: 4, name: 'Remada' },
  { id: 5, name: 'Flexão' },
])

const getRandomColor = () => {
  const darkColors = [
    '#1B2631',
    '#212F3D',
    '#283747',
    '#2C3E50',
    '#34495E',
    '#3D3D3D',
    '#424949',
    '#515A5A',
    '#566573',
    '#5D6D7E',
    '#616A6B',
    '#626567',
    '#641E16',
    '#78281F',
    '#512E5F',
  ]
  return darkColors[Math.floor(Math.random() * darkColors.length)]
}

const addDivisions = () => {
  const count = Number(numDivisions.value) || 1
  for (let i = 0; i < count; i++) {
    workout.value.divisions.push({
      name: '',
      muscles: [],
      exercises: [],
      selectedExercise: null,
      color: getRandomColor(),
    })
  }
  showDivisionInput.value = false // Esconde o input após criar as divisões
}

const removeDivision = index => {
  workout.value.divisions.splice(index, 1)
}

const addExercise = divisionIndex => {
  const division = workout.value.divisions[divisionIndex]

  let exName = ''

  for (const i of exercisesStore.state.exercicies) {
    if (i.id == division.selectedExercise) {
      exName = i.name
    }
  }

  division.exercises.push({ id_exercise: division.selectedExercise, sets: 3, reps: 12, name: exName })

  division.selectedExercise = null
}

const removeExercise = (divisionIndex, exerciseIndex) => {
  workout.value.divisions[divisionIndex].exercises.splice(exerciseIndex, 1)
}

const clearWorkout = () => {
  workout.value = {
    name: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    athlete: 5,
    divisions: [],
  }
  numDivisions.value = 1
  showDivisionInput.value = true // Exibe o input de divisões novamente
}

const isFormValid = computed(
  () => workout.value.name && workout.value.description && workout.value.divisions.length > 0,
)

onMounted(() => {
  musclesStore.getMuscles()
  exercisesStore.getExercicies()
})
</script>

<template>
  <VRow>
    <!-- {{ workout }} -->
    <VCol cols="12">
      <VCard class="border rounded-lg p-4 mb-4">
        <div
          class="title-section-new"
          :style="{ backgroundColor: '#4169E1', marginTop: '10px' }"
        >
          <VIcon
            :icon="Dumbbell"
            color="white"
          />
          <h2>Criar Novo Treino</h2>
        </div>
        <VCardText class="d-flex flex-column">
          <VRow class="align-center my-2 gap-1">
            <VCol cols="2">
              <div
          class="title-section-align"
          :style="{ backgroundColor: '#4169E1' }"
              >
          <VIcon :icon="BicepsFlexed" />
          <h4>Nome do Treino: </h4>
              </div>
            </VCol>
            <VTextField
              v-model="workout.name"
              label="Nome do Treino"
              color="primary"
            />
          </VRow>
          
          <VRow class="align-center my-2 gap-1">
            <VCol cols="2">
              <div
          class="title-section-align"
          :style="{ backgroundColor: '#4169E1' }"
              >
          <VIcon :icon="BicepsFlexed" />
          <h4>Descrição do Treino: </h4>
              </div>
            </VCol>
            <VTextField
              v-model="workout.description"
              label="Descrição do Treino"
              color="primary"
            />
          </VRow>
          
          <VRow class="align-center my-2 gap-1">
            <VCol cols="2">
              <div
          class="title-section-align"
          :style="{ backgroundColor: '#4169E1' }"
              >
          <VIcon :icon="BicepsFlexed" />
          <h4>Quantidade de Divisões: </h4>
              </div>
            </VCol>
            <VTextField
              v-model="numDivisions"
              label="Quantidade de Divisões"
              type="number"
              min="1"
              color="primary"
              :disabled="workout.divisions.length >= 1"
            />
            <VCol cols="6">
              <VBtn
          color="primary"
          @click="addDivisions"
          :disabled="workout.divisions.length >= 1"

              >Criar Divisões</VBtn>
            </VCol>
          </VRow>
        </VCardText>

        <VCardText
          v-for="(division, index) in workout.divisions"
          :key="index"
          class="border rounded-lg p-4 mb-4 bg-blue-lighten-5"
        >
        
          <VRow class="align-center my-5 gap-1">
            <VCol cols="2">
              <div
                class="title-section-align"
                :style="{ backgroundColor: division.color }"
              >
                <VIcon :icon="BicepsFlexed" />
                <h4>Divisão: {{ index + 1 }}</h4>
              </div>
            </VCol>

            <VTextField
              v-model="division.name"
              label="Nome da Divisão"
              color="primary"
            />
          </VRow>

          <VRow class="align-center my-5 gap-1">
            <VCol cols="2">
              <div
                class="title-section-align"
                :style="{ backgroundColor: division.color }"
              >
                <VIcon :icon="BicepsFlexed" />
                <h4>Músculos Trabalhados:</h4>
              </div>
            </VCol>

            <VCombobox
              v-model="division.muscles"
              :items="musclesStore.state.muscles"
              item-title="name"
              item-value="id"
              multiple
              chips
              clearable
              color="primary"
              placeholder="Selecione os Músculos Da Divisão"
              @update:modelValue="exercisesStore.filterExercicies(division.muscles)"
            />
          </VRow>

        

          <VRow class="align-center my-5 gap-1">
            <VCol cols="2">
              <div
                class="title-section-align"
                :style="{ backgroundColor: division.color }"
              >
                <VIcon :icon="BicepsFlexed" />
                <h4>Adicionar Exercícios:</h4>
              </div>
            </VCol>

            <VRow class="align-center">
              <VCol cols="8">
                <VSelect
                  label="Selecionar Exercício"
                  v-model="division.selectedExercise"
                  :items="exercisesStore.filterExercicies(division.muscles)"
                  item-title="name"
                  item-value="id"
                  clearable
                  color="primary"
                />
              </VCol>
              <VCol cols="2">
                <VBtn
                  color="primary"
                  @click="addExercise(index)"
                  :disabled="!division.selectedExercise"
                >
                  Adicionar
                </VBtn>
              </VCol>
            </VRow>
          </VRow>

          <div
            v-if="division.exercises.length"
            class="mt-5"
          >
            <div
              class="title-section"
              :style="{ backgroundColor: division.color, marginLeft: '5px' }"
            >
              <VIcon :icon="BicepsFlexed" />
              <h4>Exercícios Selecionados:</h4>
            </div>
            <VRow
              v-for="(exercise, exIndex) in division.exercises"
              :key="exIndex"
              class="align-center border rounded-lg my-2 mx-1"
            >
              <VCol cols="4">
                <span>{{ exercise.name }}</span>
              </VCol>
              <VCol cols="3">
                <VTextField
                  v-model="exercise.sets"
                  type="number"
                  label="Séries"
                  color="primary"
                />
              </VCol>
              <VCol cols="3">
                <VTextField
                  v-model="exercise.reps"
                  type="number"
                  label="Repetições"
                  color="primary"
                />
              </VCol>
              <VCol cols="2">
                <VBtn
                  color="red"
                  @click="removeExercise(index, exIndex)"
                >
                  <VIcon :icon="Trash" /> Remover
                </VBtn>
              </VCol>
            </VRow>
          </div>

          <VBtn
            color="red"
            class="mt-3"
            @click="removeDivision(index)"
          >
            <VIcon :icon="Trash" /> Remover Divisão
          </VBtn>
        </VCardText>

        <VDivider color="primary" />

        <VCardText class="d-flex justify-space-between mt-5" v-if="workout.divisions.length >= 1">
          <VBtn
            color="green"
            @click="console.log(workout)"
          >
            <VIcon :icon="Save" /> Criar Treino
          </VBtn>

          <VBtn
            color="red"
            @click="clearWorkout"
          >
            <VIcon :icon="XCircle" /> Limpar Treino
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped>
.title-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  width: fit-content;
  border-radius: 0.5rem;
  margin: 10px 0;
}

.title-section-align {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  width: 100%;
  border-radius: 0.5rem;
  margin: 10px 0;
}

.title-section-new {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  width: fit-content;
  border-radius: 0.5rem;
  margin: 5px 20px;
  color: white !important;
}
</style>
