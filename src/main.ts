import { createApp, h, provide } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {DefaultApolloClient, apolloClient} from './apollo';

store.commit('initializeAuth')
createApp({
    setup () 
    {
        provide(DefaultApolloClient, apolloClient);
    },
  
    render () 
    {
        return h(App);
    }
})
    .use(store)
    .use(router)
    .mount('#app');
