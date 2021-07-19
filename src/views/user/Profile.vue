<template>
  <Navbar />
  <button class = "button button--logout" @click="logoutHandler"><i class = "fa fa-sign-out-alt mr-1"></i>Logout</button>
  <div class="container__flex container__flex--center container__flex--profile">

    <div class="card card--auth animate__animated animate__zoomIn animate__fast">
      <h2 class="text text--white card__title">
        <img src="img/profile.svg" class="card__title__img" />
      </h2>
      <p class="text text--gray card__text">
        ¡Hey! if you wanna change your
        <span class="font-weight-bold text--graylight">profile data</span> just
        change it and click on the

        <span class="font-weight-bold text--graylight">update</span> button
      </p>
      <div class="mt-5">
        <ProfileForm />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import Navbar from "@/components/layouts/Navbar.vue";
import ProfileForm from "@/components/user/ProfileForm.vue";
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export default defineComponent({
  name: "Profile",
  components: { Navbar, ProfileForm },
  setup () {
    const store = useStore()
    const router = useRouter()
    const logoutHandler = () => {
      store.commit('logout')
      router.push('/')
    } 
    return {logoutHandler}
  }
});
</script>
