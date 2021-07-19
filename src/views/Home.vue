<template>
  <Login v-if="!user.isLogged"/>
  <Tasks v-else/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {useStore} from 'vuex'
import Login from '@/views/auth/Login.vue';
import Tasks from './tasks/Tasks.vue';

export default defineComponent({
  name: 'Home',
  components: {Login, Tasks},
  setup () 
    {
        const store = useStore()
        const user = store.state.user
        return {user};
    }
});
</script>
