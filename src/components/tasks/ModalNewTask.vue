<template>
  <div class="modal" ref="modal" :class="open ? 'active' : ''">
    <div
      class="modal__content animate__animated animate__backInDown animate__fast"
    >
    <div class="card card--modal"></div>
      <span class="close" @click="closeModal">&times;</span>
      <h2 class="text text--white card__title">
        <img src="img/clipboard.svg" class="card__title__img" />
      </h2>
        <NewTaskForm @newTask="newTaskHandler()"/>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import NewTaskForm from '@/components/tasks/NewTaskForm.vue'
export default defineComponent({
  name: "ModalNewTask",
  emits: ["close", 'newTask'],
  components: {NewTaskForm},
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const modal = ref(null);

    const closeModal = () => {
      setTimeout( () => {
        emit("close");
      }, 1000)
    };

    const newTaskHandler = () => {
        closeModal();
        emit("newTask");
    }

    onMounted(() => {
      window.onclick = function(event) {
        if (event.target == modal.value) {
          closeModal();
        }
      };
    });

    return { closeModal, modal, newTaskHandler};
  },
});
</script>

