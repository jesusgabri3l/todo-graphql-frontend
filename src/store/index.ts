import { createStore } from "vuex";
import {getTasksByUserID} from '@/api/tasks'
export default createStore({
  state: {
    user: {
      isLogged: false,
      id: null,
      username: null,
      name: null,
    },
    tasks: [],
  },
  mutations: {
    initializeAuth(state) {
      const data = localStorage.getItem('auth')
      if(!data) return
      const auth = JSON.parse(data)
      state.user = {...auth}
    },
    authIn(state, data) {
      const {id, username, name} = data;
      state.user.id = id;
      state.user.username = username;
      state.user.name = name
      state.user.isLogged = true;
      localStorage.setItem('auth', JSON.stringify(state.user))
    },

    logout(state){
      state.user.id = null;
      state.user.username = null;
      state.user.name = null
      state.user.isLogged = false;
      localStorage.removeItem('auth')
    },

  },
  actions: {},
  modules: {},
});
