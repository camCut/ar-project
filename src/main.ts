import {createApp} from 'vue';
import App from './App.vue';
import ArComponent from "./components/ArComponent.vue";

import {createRouter, createWebHashHistory} from 'vue-router';

const routes = [
  {
    path: '/',
    component: ArComponent,
    props: (route: any) => ({orientation: Number(route.query.orientation)}),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
