<template>
 <div class="">
 <ArTest2 v-if="true"/>
 </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArTest from "./components/ArTest.vue";
import ArTest2 from "./components/ArTest2.vue";
import ArTest3 from "./components/ArTest3.vue";

export default defineComponent({
  name: "App",
  components: {
    // ArTest,
    ArTest2,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
video {
  display: block !important;
}
</style>
