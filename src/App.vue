<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col">
          <button class="btn btn-primary" @click="goToLocationBased">
            Location Based
          </button>
        </div>
        <div class="col">
          <button class="btn btn-primary" @click="goToMarkerBased">
            Marker Based Based
          </button>
        </div>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    const router = useRouter();

    function removeBlackVideo() {
      const elements = document.getElementsByTagName("video");
      for (let item of elements) {
        if (!item.hasAttribute("id")) {
          item.setAttribute("style", "display:none");
        }
      }
    }
    function goToLocationBased() {
      removeBlackVideo();
      router.push({ name: "LocationBased" });
    }
    function goToMarkerBased() {
      removeBlackVideo();
      router.push({ name: "MarkerBased" });
    }
    return { goToLocationBased, goToMarkerBased };
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
  aspect-ratio: 1/1;
}
</style>
