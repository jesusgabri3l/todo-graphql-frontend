<template>
  <form class="form" @submit="handleUpdateProfile">
    <div class="form__item">
      <label class="label">Name</label>
      <input
        class="input"
        placeholder="Write your username here"
        type="text"
        v-model="userData.name"
      />
    </div>

    <div class="form__item">
      <label class="label">Username</label>
      <input
        class="input"
        placeholder="Write your username here"
        type="text"
        v-model="userData.username"
      />
    </div>

    <p class="text text--errors" v-if="errors">
      {{ errors }}
    </p>
    <button
      :disabled="true"
      v-if="updateProfileLoading"
      class="button button--block mt-3 button--primary mt-3"
    >
      <Loader />
    </button>
    <button v-else class="button button--block mt-4 button--primary mt-3">
      Update profile
    </button>
  </form>
</template>

<script>
import { defineComponent, reactive, ref} from "vue";
import { useStore } from 'vuex';
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import Loader from '@/components/layouts/Loader.vue';
import {successAlert} from '@/components/layouts/alerts/Alert';

export default defineComponent({
  name: "ProfileForm",
  components: { Loader },
  setup () {
    let userData = reactive({})
    const errors = ref(null)
    const store = useStore()
    const user = store.state.user
    userData = {...user}

      
    const handleUpdateProfile = e => {
      e.preventDefault()

      if(!userData.name || !userData.username){
        errors.value = 'Looks like there are missing fields'
        return
      }

      errors.value = null
      const {name, username, id} = userData
      updateProfile({ input: {name, username, id} })
      let tries = 0;
      
      onDoneProfileUpdate(result => {
        tries++
        if(tries > 1) return

        const {updateUser: response} = result.data
        
        if(response.response.status != 200){
          errors.value = response.response.message
          return
        }
        store.commit('authIn', userData)
        successAlert({
          title: 'You profile has been updated successfully!'
        })
        return
      })
      
    }

    const { mutate: updateProfile, loading: updateProfileLoading, onDone: onDoneProfileUpdate,} = useMutation(gql`
      mutation updateProfile($input: UpdateUserInput!) {
        updateUser(input: $input) {
          response{
            status
            message
          }
        }
      }
    `);

    return {userData, handleUpdateProfile,updateProfileLoading, errors}
  }
});
</script>
