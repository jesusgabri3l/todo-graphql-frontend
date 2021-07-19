<template>
  <form class="form mt-3 px" @submit="handleNewTask">
    <div class="form__item">
      <label class="label">Title</label>
      <input
        class="input"
        placeholder="Homework..."
        type="text"
        v-model="title"
      />
    </div>
    <div class="form__item">
      <label class="label">Description</label>
      <textarea
        class="input"
        placeholder="To finish all my homework, and make sure to..."
        type="text"
        v-model="description"
      />
    </div>

    <p class="text text--errors" v-if="errors">
      {{ errors }}
    </p>

    <button
      class="button button--block mt-5 button--primary mt-3"
      type="submit"
    >
      Add new task
    </button>
  </form>
</template>

<script>
import { defineComponent, reactive, toRefs, ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useStore } from "vuex";
import { successAlert } from "@/components/layouts/alerts/Alert";
import Loader from "@/components/layouts/Loader.vue";

export default defineComponent({
  name: 'NewTaskForm',
  emits: ["newTask"],
  setup(props, { emit }) {
    const task = reactive({ title: "", description: "" });
    const errors = ref(null);
    const store = useStore();

    const {
      mutate: newTask,
      loading: newTaskLoading,
      onDone: onDoneNewTask,
    } = useMutation(gql`
      mutation addNewTask($task: TaskInput!) {
        newTask(task: $task) {
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

    const handleNewTask = (e) => {
      e.preventDefault();
      if (!task.title || !task.description) {
        errors.value = "Looks like there are missing fields";
        return;
      }
      errors.value = null;
      newTask({ task: { ...task, userID: store.state.user.id } });
      let tries = 0;

      onDoneNewTask((result) => {
        tries++;
        if (tries > 1) return;

        const { newTask: response } = result.data;

        if (response.response.status != 200) {
          errors.value = response.response.message;
          return;
        }
        emit("newTask")
        successAlert({
          title: "New task added!",
        });

        return;
      });
    };

    return { handleNewTask, ...toRefs(task), errors };
  },
});
</script>
