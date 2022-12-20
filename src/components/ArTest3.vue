<template>
  <div class="hello">
    <a-scene
      vr-mode-ui="enabled: false"
      arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false"
      renderer="antialias: true; alpha: true"
    >
      <a-assets timeout="10000" @loadeddata="test"
        ><a-asset-item
          id="crate-obj"
          src="../assets/models/obj/test.obj" 
        ></a-asset-item>
        <a-asset-item
          id="crate-mtl"
          src="../assets/models/obj/test.mtl" 
        ></a-asset-item>
      </a-assets>
      <a-entity preload="auto" obj-model="obj: #crate-obj; mtl: #crate-mtl" gps-entity-place="latitude: 50.085953; longitude: 8.647388;"></a-entity>
<!-- 
      <a-assets>
        <a-asset-item
          id="cityModel"
          src="https://cdn.aframe.io/test-models/models/glTF-2.0/virtualcity/VC.gltf"
          gps-entity-place="latitude: 50.085953; longitude: 8.647388;"
        ></a-asset-item>
      </a-assets>
      <a-entity
        gltf-model="#cityModel"
        modify-materials
        gps-entity-place="latitude: 50.085953; longitude: 8.647388;"
      ></a-entity> -->
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
  name: "ArTest2",
  setup() {
    //https://ar-js-org.github.io/AR.js-Docs/location-based-aframe/
    const canvas = ref();

    onMounted(() => {
      let testEntityAdded = false;

      const el = document.querySelector("[gps-new-camera]");

      el.addEventListener("gps-camera-update-position", (e) => {
        if (!testEntityAdded) {
          // alert(`Got first GPS position: lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`);

          // Add a box to the north of the initial GPS position
          const entity = document.createElement("a-box");
          entity.setAttribute("scale", {
            x: 200,
            y: 200,
            z: 200,
          });
          entity.setAttribute("material", { color: "red" });
          entity.setAttribute("gps-new-entity-place", {
            latitude: e.detail.position.latitude + 0.01,
            longitude: e.detail.position.longitude,
          });
          document.querySelector("a-scene").appendChild(entity);

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

          // const modelTest = document.createElement("a-obj-model");
          // modelTest.setAttribute("src", "../assets/models/obj/test.obj");
          // modelTest.setAttribute("mtl", "../assets/models/obj/test.mtl");

          // modelTest.setAttribute('gps-new-entity-place', {
          //     latitude: e.detail.position.latitude +0.01 ,
          //     longitude: e.detail.position.longitude +0.0
          // });
          // document.querySelector("a-scene").appendChild(modelTest);
        }
        testEntityAdded = true;
      });
    });

    function test() {
      console.log('loaded');
    }
    return { canvas, test };
  },
});
</script>
  
  <style scoped>
</style>
  