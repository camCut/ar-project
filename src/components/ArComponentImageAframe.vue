

<template>
  <div id="container">
    <!-- <div class="row mt-5 w-50" style="position: absolute; left: 500">
      <div class="col">
        <button class="btn btn-secondary" @click="changePlaneColor">
          Change plane color
        </button>
      </div>
      <div class="col">
        <button class="btn btn-secondary" @click="openTrackingMarker">
          {{ trackerOpened ? "Close Tracking-Marker" : "Open Tracking-Marker" }}
        </button>
      </div>
    </div> -->

    <img
      src="../assets/img/pattern-pattern-wdw-pattern_2.png"
      v-show="trackerOpened"
      style="position: relative"
    />
    <a-scene
      arjs
      vr-mode-ui="enabled: false"
      reflection="directionalLight:a-light#dirlight;"
      renderer="antialias: true;
                   colorManagement: true;
                   sortObjects: true;
                   physicallyCorrectLights: true;
                   maxCanvasWidth: 1920;
                   maxCanvasHeight: 1920;"
    >
      <!-- <a-marker preset="hiro"> -->
      <a-light
        id="dirlight"
        intensity="3"
        light="castShadow:true;type:directional"
        position="1 20 1"
      ></a-light>
      <a-entity light="type: ambient; color: #CCC"></a-entity>
      <a-marker type="pattern" url="../../data/pattern-pattern-wdw-pattern_2.patt">
        <a-plane
          color="#ffff00"
          height="1"
          width="1"
          opacity="0.2"
          rotation="-90 0 0"
        ></a-plane>
        <!-- <a-box
          position="0 0 0"
          rotation="0 0 0"
          color="#4CC3D9"
          opacity="0.5"
        ></a-box> -->
        <!-- <a-sphere position="0 0 2" radius="0.75" color="blue"></a-sphere> -->
        <!-- <a-cylinder
          position="0 0 2"
          radius="0.5"
          height="1.5"
          color="#FFC65D"
        ></a-cylinder> -->
        <!-- <a-entity
          gltf-model="url(https://cdn.aframe.io/examples/ar/models/triceratops/scene.gltf)"
          scale="0.01 0.01 0.01 "
          position="0 0 0"
        >
        </a-entity> -->
      </a-marker>
      <a-entity id="rig" position="0 0 0">
        <a-entity camera></a-entity>
      </a-entity>
    </a-scene>
  </div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
export default {
  setup() {
    function addModel(url, scale, position, rotation) {
      const model = document.createElement("a-entity");
      model.setAttribute("gltf-model", `url(${url})`);
      model.setAttribute("scale", {
        x: scale[0],
        y: scale[1],
        z: scale[2],
      });
      model.setAttribute("position", {
        x: position[0],
        y: position[1],
        z: position[2],
      });
      model.setAttribute("rotation", {
        x: rotation[0],
        y: rotation[1],
        z: rotation[2],
      });

      document.querySelector("a-marker").appendChild(model);
    }
    function addText(value, scale, position, rotation) {
      const text = document.createElement("a-text");
      text.setAttribute("align", "center");
      text.setAttribute("value", value);
      text.setAttribute("scale", {
        x: scale[0],
        y: scale[1],
        z: scale[2],
      });
      text.setAttribute("position", {
        x: position[0],
        y: position[1],
        z: position[2],
      });
      text.setAttribute("rotation", {
        x: rotation[0],
        y: rotation[1],
        z: rotation[2],
      });
      document.querySelector("a-marker").appendChild(text);
    }
    function addBox(scale, position, rotation, color) {
      const box = document.createElement("a-box");
      box.setAttribute("scale", {
        x: scale[0],
        y: scale[1],
        z: scale[2],
      });
      box.setAttribute("position", {
        x: position[0],
        y: position[1],
        z: position[2],
      });
      box.setAttribute("rotation", {
        x: rotation[0],
        y: rotation[1],
        z: rotation[2],
      });
      box.setAttribute("material", { color: color });

      box.setAttribute("opacity", "0.1");
      document.querySelector("a-marker").appendChild(box);
    }

    onMounted(() => {

       addModel(
          "https://cdn.aframe.io/examples/ar/models/triceratops/scene.gltf",
          [0.01, 0.01, 0.01],
          [0, 0, 0],
          [0, 0, 0]
        );

        addText("Triceratops", [1, 1, 1], [0, 1.5, 0], [0, 0, 0]);
      const el = document.querySelector("a-scene");
      // el.addEventListener("markerFound", () => {
      //   console.log('client', document.querySelector('video').clientHeight);
      //   console.log('client', document.querySelector('video').clientWidth);
      //   console.log("marker found");
      //   const videoStyle = document.querySelector('video')
      //    document.querySelector("a-scene").setAttribute('style', `width: ${videoStyle.clientWidth};height: ${videoStyle.clientHeight}`)
        
      //   // // addBox([2.5, 2.5, 2.5], [0, 0, 0], [0, 0, 0], "#4CC3D9");
      //   addModel(
      //     "https://cdn.aframe.io/examples/ar/models/triceratops/scene.gltf",
      //     [0.01, 0.01, 0.01],
      //     [0, 0, 0],
      //     [0, 0, 0]
      //   );

      //   addText("Triceratops", [1, 1, 1], [0, 1.5, 0], [0, 0, 0]);
      // });
    });

    function changePlaneColor() {
      const sphere = document.querySelector("a-plane");
      const color = sphere.getAttribute("color");
      sphere.setAttribute("color", color === "blue" ? "green" : "blue");
    }
    let trackerOpened = ref(false);
    function openTrackingMarker() {
      trackerOpened.value = !trackerOpened.value;
    }
    return { changePlaneColor, openTrackingMarker, trackerOpened };
  },
};
</script>


<style>
.red {
  color: #f00;
}
button {
  position: fixed;
  z-index: 9999;
}
/* for embedded */
/*
a-scene {
  width: 1264px;
  height: 948px;
}*/
html.a-fullscreen .a-canvas {
  position: relative !important;
}

</style>