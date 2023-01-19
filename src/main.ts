import {createApp} from 'vue';
import App from './App.vue';
import ImageBased from "./components/ArComponentImageAframe.vue";
import LocationBased from "./components/ArComponentLocation.vue";
import {createRouter, createWebHashHistory} from 'vue-router';
// require('aframe')

const routes = [
  {
    name:"LocationBased",
    path: '/locationbased',
    component: LocationBased,
    // props: (route: any) => ({orientation: Number(route.query.orientation)}),
  },
  {
    name:"MarkerBased",
    path: '/markerbased',
    component: ImageBased,
    // props: (route: any) => ({orientation: Number(route.query.orientation)}),
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
