<template>
    <button class="button button--back" @click="goBack"> <i class="fa fa-arrow-left"></i> </button>
    <div class="container__flex container__flex--center">
      <div class="card card--auth animate__animated animate__zoomIn animate__fast">
        <h2 class="text text--white card__title">
          <img src="img/add-user.svg" class="card__title__img"/>
        </h2>
        <p class="text text--gray card__text">
          ¡Hey! choose an awesome
          <span class="font-weight-bold text--graylight">username</span> and a
          memorable
          <span class="font-weight-bold text--graylight">password</span>
        </p>
        <div class="mt-5">
         <RegisterForm /> 
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {useRouter} from 'vue-router'
import RegisterForm from '@/components/auth/RegisterForm.vue'
export default defineComponent({
    name: 'Register',
    components: {RegisterForm},
    setup(){
        const router = useRouter();
        const goBack = () => {
            router.go(-1)
        }
        return {goBack}
    }
})
</script>

