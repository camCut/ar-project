<template>
  <div id="app">
    <BaseMenu style="z-index:9999"></BaseMenu>

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseMenu from "@/components/BaseMenu.vue";
export default defineComponent({
  name: "App",
  components: { BaseMenu },

});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.btn {
  z-index:9999
}
</style>
