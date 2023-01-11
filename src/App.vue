<template>
 <div >
 <ArTest5 v-if="true"/>
 </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArTest from "./components/ArTest.vue";
import ArTest2 from "./components/ArTest2.vue";
import ArTest3 from "./components/ArTest3.vue";
import ArTest4 from "./components/ArTest4.vue";
import ArTest5 from "./components/ArTest5.vue";

export default defineComponent({
  name: "App",
  components: {
    ArTest5,
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
