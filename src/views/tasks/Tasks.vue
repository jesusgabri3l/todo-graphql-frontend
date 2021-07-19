<template>
    <Navbar />
    <div class="tasks">
      
      <ModalNewTask @close="openModal=false" :open="openModal" @newTask="refetch()"/>
      <Loader v-if="loading"></Loader>
      <div class="tasks__grid " v-else>
        <div class="tasks__grid__item dropzone animate__animated animate__zoomIn animate__fast" :class="onDrag ? 'active' : ''" @drop="onDrop($event, 1)" @dragenter.prevent @dragover.prevent>
          <div class="tasks__grid__item__header">
            <h4 class="tasks__grid__item__title text">To do</h4>
            <button class="tasks__button animate__animated animate__zoomIn animate__fast animate__delay-1s" @click="openModal=true">+</button>
          </div>
          <div class="tasks__grid__item__body" >
            <div
              class="task"
              draggable="true"
              v-for="task in getTaskByState(1)"
              :key="task.id"
              @dragstart="startDrag($event, task)"
            >
              <div class="task__header">
                <h5 class="task__title">{{ task.title }}</h5>
              </div>
              <div class="task__body">
                <p class="task__description">
                  {{ task.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="tasks__grid__item dropzone animate__animated animate__zoomIn animate__fast" :class="onDrag ? 'active' : ''" @drop="onDrop($event, 2)" @dragenter.prevent @dragover.prevent> 
          <div class="tasks__grid__item__header">
            <h4 class="tasks__grid__item__title text">Doing</h4>
          </div>
          <div class="tasks__grid__item__body" >
            <div
              class="task"
              draggable="true"
              v-for="task in getTaskByState(2)"
              :key="task.id"
              @dragstart="startDrag($event, task)"
            >
              <div class="task__header">
                <h5 class="task__title">{{ task.title }}</h5>
              </div>
              <div class="task__body">
                <p class="task__description">
                  {{ task.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="tasks__grid__item dropzone animate__animated animate__zoomIn animate__fast"  :class="onDrag ? 'active' : ''" @drop="onDrop($event, 3)" @dragenter.prevent @dragover.prevent>
          <div class="tasks__grid__item__header">
            <h4 class="tasks__grid__item__title text">Done</h4>
          </div>
          <div class="tasks__grid__item__body" >
            <div
              class="task"
              draggable="true"
              v-for="task in getTaskByState(3)"
              :key="task.id"
              @dragstart="startDrag($event, task)"
            >
              <div class="task__header">
                <h5 class="task__title">{{ task.title }}</h5>
              </div>
              <div class="task__body">
                <p class="task__description">
                  {{ task.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="trash dropzone" :class="onDrag ? 'active': ''" @drop="onDrop($event, 4)" @dragenter.prevent @dragover.prevent>
        <i class="fa fa-trash"></i>
      </div>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import {useStore} from 'vuex'
import { useRouter } from "vue-router";
import Navbar from "@/components/layouts/Navbar.vue";
import ModalNewTask from '@/components/tasks/ModalNewTask.vue';
import {getTasksByUserID} from '@/api/tasks'
import Loader from '@/components/layouts/Loader.vue';
import gql from "graphql-tag";
import { useMutation } from "@vue/apollo-composable";


export default defineComponent({
  name: "Tasks",
  components: { Navbar, ModalNewTask, Loader },
  setup() {
    const router = useRouter();
    const openModal = ref(false)
    const tasks = ref([]);
    const store = useStore();
    const {loading, onResult, refetch} = getTasksByUserID(store.state.user.id)
    const onDrag = ref(false)

    onResult(result => {
      const {tasksByUser: response} = result.data
      if(response.response.status!=200) return console.log('Something went wrong')
      tasks.value = [...response.tasks]
    })
    
    const getTaskByState = (status) => {
      return tasks.value.filter((task) => task.status == status);
    }

    const startDrag = (event, item) => {
      onDrag.value = true
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('itemID', item.id)

    } 

    const onDrop = (event, status) => {
      onDrag.value = false
      const itemID = event.dataTransfer.getData('itemID')
      updateTaskStatus({id: itemID, status})
      onDoneUpdateStatus( result => {
        const {updateTaskStatus: response} = result.data
        if(response.response.status != 200) return
        refetch()
      })
    }

    
    const {mutate: updateTaskStatus,onDone: onDoneUpdateStatus,} = useMutation(gql`
      mutation updateStatus($id: ID!, $status: Int!) {
        updateTaskStatus(id: $id, status: $status) {
          response {
            status
            message
          }
          task {
            id
            title
            description
          }
        }
      }
    `);
    
    return { router, tasks, getTaskByState, startDrag, onDrop, openModal, loading, refetch, onDrag};
  },
});
</script>


