<template>
  <div class="hello">
    <a-scene
      id="a-scene"
      vr-mode-ui="enabled: false"
      arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false"
      renderer="antialias: true; alpha: true"
    >
      <a-camera
        arjs-device-orientation-controls="smoothingFactor: 0.3"
        gps-new-camera="gpsMinDistance: 5"
      ></a-camera>
    </a-scene>
  </div>
</template>
  
  <script >
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "ArTest4",
  setup() {
    //NOTE:
    //https://ar-js-org.github.io/AR.js-Docs/location-based-aframe/
    // TIZ: 49.8709868, 8.64242236
    // Frankfurt Niederrad: 50.0734195, 8.6361502

    function addBox(coords, scale, position, rotation, color) {
      // Add a box southeast of the current location
      const box = document.createElement("a-box");
      box.setAttribute("scale", {
        x: scale[0],
        y: scale[1],
        z: scale[2],
      });
      box.setAttribute("material", { color: color });
      // box.setAttribute("metalness", 1)
      box.setAttribute("gps-new-entity-place", {
        latitude: coords[0],
        longitude: coords[1],
      });
      // position the model 10m below camera position
      box.setAttribute("position", position);
      box.setAttribute("rotation", rotation);
      document.querySelector("a-scene").appendChild(box);
    }
    function addModel(url, coords, scale, position) {
      const model = document.createElement("a-entity");
      model.setAttribute("gltf-model", `url(${url})`);
      model.setAttribute("scale", {
        x: scale[0],
        y: scale[1],
        z: scale[2],
      });
      model.setAttribute("gps-new-entity-place", {
        latitude: coords[0],
        longitude: coords[1],
      });
      model.setAttribute("position", position);

      document.querySelector("a-scene").appendChild(model);
    }




    function addText(text, coords, textScale, position, lookAtCamera) {
      const compoundEntity = document.createElement("a-entity");
      compoundEntity.setAttribute("gps-new-entity-place", {
        latitude: coords[0],
        longitude: coords[1],
      });
      const textEl = document.createElement("a-text");

      if (lookAtCamera) {
        textEl.setAttribute("look-at", "[gps-new-camera]");
      }
      textEl.setAttribute("scale", {
        x: textScale,
        y: textScale,
        z: textScale,
      });
      // textEl.setAttribute("position", position);

      textEl.setAttribute("value", text);
      textEl.setAttribute("align", "center");
      compoundEntity.appendChild(textEl);
      document.querySelector("a-scene").appendChild(compoundEntity);
    }
    onMounted(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
      });
      let testEntityAdded = false;
      const el = document.querySelector("[gps-new-camera]");

      el.addEventListener("gps-camera-update-position", (e) => {
        console.log(e.detail.position.latitude);
        console.log(e.detail.position.longitude);
        if (!testEntityAdded) {
          // alert(`Got first GPS position: lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`);

          // Add a box @rotekirche ffm niederrad
          addBox(
            [50.0865022, 8.6441057],
            [25, 250, 25],
            "[0 0 0]",
            "0 45 0",
            "red"
          );
          // Add a box @messeturm ffm
          addBox(
            [50.1110249, 8.6484395],
            [250, 2500, 250],
            "[0 -10  0]",
            "0 0 0 ",
            "purple"
          );
          // Add a box @rennbahnpark ffm niederrad
          addBox(
            [50.086027, 8.653351],
            [250, 5, 250],
            "[0 -100  0]",
            "0 40 0 ",
            "green"
          );
          // Add a box @waldstadion ffm 
          addBox(
            [50.068432, 8.645136],
            [250, 50, 250],
            "[0 -100  0]",
            "0 40 0 ",
            "white"
          );
          // Add a box @airport ffm 
          addBox(
            [50.040898, 8.568414],
            [2500, 50, 2500],
            "[0 -100  0]",
            "0 40 0 ",
            "blue"
          );
          // addModel('https://cdn.aframe.io/examples/ar/models/triceratops/scene.gltf', [e.detail.position.latitude -0.00001, e.detail.position.longitude +0.0005], [25,25,25], "[0,-10, 0]")
         addText("Messeturm",[e.detail.position.latitude +0.001, e.detail.position.longitude +0.0001], 100, "[0 0 0]", true)
          
        }

        testEntityAdded = true;
      });
      console.log(document.getElementById("a-scene"));
    });

    return {};
  },
});
</script>
  
  <style scoped>
</style>
  