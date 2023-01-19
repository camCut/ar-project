    <template>
  <div class="container">
    <div class="row">
      <div class="col">
        <button
          class="btn btn-primary"
          style="z-index: 9999"
          @click="goToLocationBased"
        >
          Location Based
        </button>
      </div>
      <div class="col">
        <button
          class="btn btn-primary"
          style="z-index: 9999"
          @click="goToMarkerBased"
        >
          Marker Based Based
        </button>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from 'vue-router';

export default defineComponent({
  name: "baseMenu",
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
</style>
