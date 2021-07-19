<template>
  <form class="form" @submit="handleSubmitRegister">
    <div class="form__item">
      <label class="label">Name</label>
      <input
        class="input"
        placeholder="Write your username here"
        type="text"
        v-model="name"
      />
    </div>

    <div class="form__item">
      <label class="label">Username</label>
      <input
        class="input"
        placeholder="Write your username here"
        type="text"
        v-model="username"
      />
    </div>

    <div class="form__item">
      <label class="label">Password</label>
      <input
        class="input"
        placeholder="Write your password here"
        type="password"
        v-model="password"
      />
    </div>

    <p class="text text--errors" v-if="errors">
      {{ errors }}
    </p>
    <button :disabled = "true" v-if = "tryLoginLoading" class="button button--block mt-3 button--primary mt-3" type="button">
      <Loader />
    </button>
    <button v-else class="button button--block mt-3 button--primary mt-3" type="submit">
      Sign up
    </button>
  </form>
</template>

<script>
import { defineComponent, reactive, toRefs, ref } from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import Loader from '@/components/layouts/Loader.vue';
import {successAlert} from '@/components/layouts/alerts/Alert';

export default defineComponent({
    name: 'RegisterForm',
    components: {Loader},
    setup() {
    const router = useRouter();
    const store = useStore();
    const dataRegister = reactive({ name: "", username: "", password: "" });
    const errors = ref(null)
    
    const handleSubmitRegister = (e) => {
        e.preventDefault();

        if (dataRegister.username == "" || dataRegister.password == "" || dataRegister.name == "") {
        errors.value = "Hey, looks like there are missing fields!";
        return;
      }
      errors.value = null;
      handleRegisterRequest()
    }

    const handleRegisterRequest = () => {
      const input = { name: dataRegister.name, username: dataRegister.username, password: dataRegister.password }
      tryRegister({input});
      let tries = 0;
      
      onDone(result => {
        tries++
        if(tries > 1) return

        const { register: responseRegister } = result.data;

        if (responseRegister.response.status !== 200) {
          errors.value = responseRegister.response.message;
          return;
        }

        const user = responseRegister.user
        store.commit('authIn', {...user})
        router.push('/')
        successAlert({
          title: 'You are now registered!'
        })
        return
      });
    }

    

    //HANDLE REQUEST FOR REGISTER
    const {mutate: tryRegister, loading: tryLoginLoading, onDone} = useMutation(gql`
      mutation ($input: RegisterInput!) {
        register(input: $input) {
          response{
            status
            message
          }
          user {
            id
            name
            username
          }
        }
      }
    `);
    
        return {...toRefs(dataRegister), handleSubmitRegister, tryLoginLoading, errors}
    }
})
</script>

