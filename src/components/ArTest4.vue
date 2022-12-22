<template>
  <div class="hello">
    <a-scene
      vr-mode-ui="enabled: false"
      arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false"
      renderer="antialias: true; alpha: true"
    >
      <a-camera
        arjs-look-controls="smoothingFactor: 0.1"
        gps-new-camera="gpsMinDistance: 5"
      ></a-camera>
    </a-scene>
  </div>
</template>
  
  <script>
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "ArTest4",
  setup() {
    //https://ar-js-org.github.io/AR.js-Docs/location-based-aframe/
    const canvas = ref();

    onMounted(() => {
      let testEntityAdded = false;

      const el = document.querySelector("[gps-new-camera]");
      const scene = document.querySelector("a-scene")



      el.addEventListener("gps-camera-update-position", (e) => {
        if (!testEntityAdded) {
          // alert(`Got first GPS position: lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`);

          // Add a box
          const box = document.createElement("a-box");
          box.setAttribute("scale", {
            x: 200,
            y: 200,
            z: 200,
          });
          box.setAttribute("material", { color: "red" });
          box.setAttribute("gps-new-entity-place", {
            latitude: e.detail.position.latitude - 0.005,
            longitude: e.detail.position.longitude +0.01,
          });
          document.querySelector("a-scene").appendChild(box);

          // Add a triceratops
          const model = document.createElement("a-entity");
          model.setAttribute(
            "gltf-model",
            // "url(https://cdn.aframe.io/test-models/models/glTF-2.0/virtualcity/VC.gltf)"
            "url(https://cdn.aframe.io/examples/ar/models/triceratops/scene.gltf)"
            // "url(../assets/models/table.glb)"
          );
          model.setAttribute("scale", {
            x: 0.5,
            y: 0.5,
            z: 0.5,
          });
          model.setAttribute("gps-new-entity-place", {
            latitude: e.detail.position.latitude - 0.0001,
            longitude: e.detail.position.longitude +0.001,
          });
          document.querySelector("a-scene").appendChild(model);


          // Add Text
          const compoundEntity = document.createElement("a-entity");
          compoundEntity.setAttribute("gps-new-entity-place", {
            latitude: e.detail.position.latitude + 0.001,
            longitude: e.detail.position.longitude,
          });
          const text = document.createElement("a-text");

          const textScale = 100;

          text.setAttribute("look-at", "[gps-new-camera]");
          text.setAttribute("scale", {
            x: textScale,
            y: textScale,
            z: textScale,
          });
          text.setAttribute("value", "If you can read this..");
          text.setAttribute("align", "center");
          compoundEntity.appendChild(text);
          document.querySelector("a-scene").appendChild(compoundEntity);
        }



        
        testEntityAdded = true;
      });
    });

    function test() {
      console.log("loaded");
    }
    return { canvas, test };
  },
});
</script>
  
  <style scoped>
</style>
  