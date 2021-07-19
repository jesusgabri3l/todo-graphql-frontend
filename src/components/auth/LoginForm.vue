<template>
  <form class="form" @submit="handleSubmitLogin">
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
    <button :disabled = "true" v-if = "tryLoginLoading" class="button button--block mt-3 button--primary mt-3">
      <Loader />
    </button>
    <button v-else class="button button--block mt-3 button--primary mt-3">
      Continue
    </button>
  </form>
</template>

<script>
import { defineComponent, reactive, toRefs, ref } from "vue";
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import Loader from '@/components/layouts/Loader.vue';
import {successAlert} from '@/components/layouts/alerts/Alert';

export default defineComponent({
  name: "LoginForm",
  components: {Loader},
  setup() {
    const store = useStore()
    const router = useRouter()
    const dataLogin = reactive({ username: "", password: "" });
    const errors = ref(null)

    const handleSubmitLogin = (e) => {
      e.preventDefault();
      if (dataLogin.username == "" || dataLogin.password == "") {
        errors.value = "Hey, looks like there are missing fields!";
        return;
      }
      errors.value = null;
      handleLoginRequest()
    };

    const handleLoginRequest = () => {
      const input = { username: dataLogin.username, password: dataLogin.password }
      tryLogin({input});
      let tries = 0;
      onDone(result => {
        tries++
        if(tries > 1) return
        const { login: responseLogin } = result.data;

        if (responseLogin.response.status !== 200) {
          errors.value = responseLogin.response.message;
          return;
        }
        const user = responseLogin.user
        store.commit('authIn', {...user})
        successAlert({
          title: 'You were logged in successfully!',
          toast: true
        })
        setTimeout( () => {
          router.push('/')
          }, 2000)
      });
    };

    //HANDLE REQUEST FOR LOGIN
    const {
      mutate: tryLogin,
      loading: tryLoginLoading,
      onDone,
    } = useMutation(gql`
      mutation tryLogin($input: LoginInput!) {
        login(input: $input) {
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

    return {
      handleSubmitLogin,
      ...toRefs(dataLogin),
      tryLoginLoading,
      errors
    };
  },
});
</script>
