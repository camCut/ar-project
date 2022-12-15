<template>
    <div class="hello" id="canvas" ref="canvas">
      <a-scene vr-mode-ui='enabled: false' arjs='sourceType: webcam; videoTexture: true; debugUIEnabled: false' renderer='antialias: true; alpha: true'>
        <a-camera  arjs-look-controls='smoothingFactor: 0.1'  gps-new-camera='gpsMinDistance: 5'></a-camera>
    </a-scene>
    </div>
  </template>
  
  <script>
  import { defineComponent, onMounted, ref } from "vue";
  import * as THREE from 'three';
  import * as THREEx from '../../node_modules/@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js';
  
  export default defineComponent({
    name: "ArTest2",
   setup() {
     const canvas = ref();
  
     onMounted(() => {
      let testEntityAdded = false;
  
      const el = document.querySelector("[gps-new-camera]");
  
      el.addEventListener("gps-camera-update-position", e => {
          if(!testEntityAdded) {
              alert(`Got first GPS position: lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`);
              // Add a box to the north of the initial GPS position
              const entity = document.createElement("a-box");
              entity.setAttribute("scale", {
                  x: 20, 
                  y: 20,
                  z: 20
              });
              entity.setAttribute('material', { color: 'red' } );
              entity.setAttribute('gps-new-entity-place', {
                  latitude: e.detail.position.latitude ,
                  longitude: e.detail.position.longitude +0.01
              });
              document.querySelector("a-scene").appendChild(entity);
          }
          testEntityAdded = true;
      });
     })
      return {canvas}
   }
  
  });
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  </style>
  