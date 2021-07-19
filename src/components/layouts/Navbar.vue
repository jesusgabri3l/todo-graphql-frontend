<template>
  <nav class="nav">
    <div class="nav__container">
      <h1 class="text">
        <router-link to="/" class="nav__logo">
          <img class="nav__logo__img" src="img/clipboard.svg" alt="Logo" />
          <router-link class="text text--primary nav__logo__text" to="/">Todo</router-link>
        </router-link>
      </h1>
      <ul class="nav__list">
        <li class="nav__list__item" @click="router.push('/profile')">
          <img
            class="nav__list__item__icon"
            src="img/add-user.svg"
            alt="Logo"
          />
          <a to ="profile" class="nav__list__item__link" @click="router.push('/profile')">Profile</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { defineComponent } from 'vue'
import {useRouter} from 'vue-router'
export default defineComponent({
   name: 'Navbar',
   setup () {
     const router = useRouter()

     return {router}
   }
})
</script>

