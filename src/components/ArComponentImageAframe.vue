

<template>
  <div id="container">
  <div class="row mt-5 w-50">
  <div class="col"><button class="btn btn-secondary" @click="changeSphereColor">Change sphere color</button></div>
    <div class="col"><button class="btn btn-secondary" @click="openTrackingMarker">{{trackerOpened ? 'Close Tracking-Marker' :'Open Tracking-Marker'}}</button></div>
  </div>
    
    <img src="../assets/img/pattern-wdw-pattern.png" v-show="trackerOpened" style="position:relative">
    <a-scene arjs>
      <!-- <a-marker preset="hiro"> -->
      <a-marker type="pattern" url="../../data/pattern-wdw-pattern.patt">
        <!-- <a-box
          position="0 0 0"
          rotation="0 0 0"
          color="#4CC3D9"
          opacity="0.5"
        ></a-box> -->
        <a-sphere position="0 0 2" radius="0.75" color="blue"></a-sphere>
        <!-- <a-cylinder
          position="0 0 2"
          radius="0.5"
          height="1.5"
          color="#FFC65D"
        ></a-cylinder> -->
        <a-entity
                gltf-model="url(https://cdn.aframe.io/examples/ar/models/triceratops/scene.gltf)"
                scale="0.01 0.01 0.01 " position="0 0 0">
            </a-entity>
      </a-marker>

      <a-entity camera></a-entity>
    </a-scene>
  </div>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core';

export default {
  setup() {

    function addModel(url,  scale, position) {
      const model = document.createElement("a-entity");
      model.setAttribute("gltf-model", `url(${url})`);
      model.setAttribute("scale", {
        x: scale[0],
        y: scale[1],
        z: scale[2],
      });

      model.setAttribute("position", position);

      document.querySelector("a-scene").appendChild(model);
    }

    onMounted(() => {
              //  addModel('https://cdn.aframe.io/examples/ar/models/triceratops/scene.gltf', [0.1,0.1,0.1], "[0  0  0]")

    })
    function changeSphereColor() {
      
      const sphere = document.querySelector("a-sphere");
      const color = sphere.getAttribute("color");
      sphere.setAttribute("color", color === "blue" ? "green" : "blue");
    }
    let trackerOpened = ref(false);
    function openTrackingMarker() {
      trackerOpened.value = !trackerOpened.value
      
    }
    return { changeSphereColor, openTrackingMarker, trackerOpened,  };
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

</style>