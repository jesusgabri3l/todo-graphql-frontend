<template>
    <div class="container__flex container__flex--center">
      <div class="card card--auth animate__animated animate__zoomIn animate__fast">
        <h2 class="text text--white card__title">
          <img src="img/clipboard.svg" class="card__title__img"/>
        </h2>
        <p class="text text--gray card__text">
          ¡Hey!, welcome to your favourite <span class="font-weight-bold text--graylight">Todo App!</span> you might login to start using
          the app
        </p>
        <div class="mt-5">
          <LoginForm /> 
        </div>
        <p class = "text card__link">Are you not registered yet?, you might sign up <router-link class="link" to = "sign-up">here</router-link></p>
      </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import LoginForm from '@/components/auth/LoginForm.vue';
export default defineComponent({
  name: "",
  components: {LoginForm}
});
</script>
