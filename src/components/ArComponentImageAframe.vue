

<template>
  <div id="container">
    <div class="d-flex button-bar">
      <button class="btn btn-secondary" @click="rotateObject">
          rotate Object
        </button>

    </div>

    <img
      src="../assets/img/pattern1.png"
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
      <!-- <a-light
        id="dirlight"
        intensity="3"
        light="castShadow:true;type:directional"
        position="1 20 1"
      ></a-light>
      <a-entity light="type: ambient; color: #CCC"></a-entity> -->
      <!-- <a-marker id="pattern1" type="pattern" url="../../data/pattern1.patt">
        <a-plane
          color="#ffff00"
          height="1"
          width="1"
          opacity="0.2"
          rotation="-90 0 0"
        ></a-plane>

      </a-marker>
      <a-marker id="pattern2" type="pattern" url="../../data/pattern2.patt">
      </a-marker>  -->

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
    function addMarker(url, id) {
      const marker = document.createElement("a-marker");
      marker.setAttribute("id", id);
      marker.setAttribute("url", url);
      marker.setAttribute("type", "pattern");
      document.querySelector("a-scene").appendChild(marker);
    }

    function addModel(url, scale, position, rotation, pattern) {
      const model = document.createElement("a-entity");
      model.setAttribute("gltf-model", `url(${url})`);
      model.object3D.scale.set(scale[0], scale[1], scale[2]);
      model.object3D.position.set(position[0], position[1], position[2]);
      model.object3D.rotation.set(rotation[0], rotation[1], rotation[2]);
      document.getElementById(pattern).appendChild(model);
    }
    function addText(value, scale, position, rotation, pattern) {
      const text = document.createElement("a-text");
      text.setAttribute("align", "center");
      text.setAttribute("value", value);
      text.object3D.scale.set(scale[0], scale[1], scale[2]);
      text.object3D.position.set(position[0], position[1], position[2]);
      text.object3D.rotation.set(rotation[0], rotation[1], rotation[2]);

      document.getElementById(pattern).appendChild(text);
    }
    function addBox(scale, position, rotation, color, pattern) {
      const box = document.createElement("a-box");
      box.object3D.scale.set(scale[0], scale[1], scale[2]);
      box.object3D.position.set(position[0], position[1], position[2]);
      box.object3D.rotation.set(rotation[0], rotation[1], rotation[2]);
      box.setAttribute("material", { color: color });
      box.setAttribute("opacity", "0.5");
      document.getElementById(pattern).appendChild(box);
    }

    onMounted(() => {
      addMarker("../../data/pattern1.patt", "pattern1");
      addMarker("../../data/pattern2.patt", "pattern2");
      addModel(
        "https://cdn.aframe.io/examples/ar/models/triceratops/scene.gltf",
        [0.01, 0.01, 0.01],
        [0, 0, 0],
        [0, 0, 0],
        "pattern1"
      );

      addText("Triceratops", [1, 1, 1], [0, 1.5, 0], [0, 0, 0], "pattern1");
      addBox([1, 1, 1], [0, 0, 0], [0, 0, 0], "#4CC3D9", "pattern2");
      // const el = document.querySelector("a-scene");
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
    function rotateObject() {
     console.log(document.querySelector("[gltf-model]").object3D.rotation);
     document.querySelector("[gltf-model]").object3D.rotation.y += 90
    }
    let trackerOpened = ref(false);
    function openTrackingMarker() {
      trackerOpened.value = !trackerOpened.value;
    }
    return { changePlaneColor, openTrackingMarker, rotateObject };
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
.button-bar {
  background: grey;
  position: absolute;
  top: 50px;
  left:50%;
}
</style>