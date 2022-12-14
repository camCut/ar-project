<template>
  <div class="hello" id="canvas1">
  
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as THREE from 'three';
// import * as THREEx from './node_modules/@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js';

export default defineComponent({
  name: "ArTest2",
 setup() {
    const canvas: any = document.getElementById('canvas')!;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1.33, 0.1, 10000);
    const renderer = new THREE.WebGLRenderer({canvas: canvas});

    // const arjs = new THREEx.LocationBased(scene, camera);
    // const cam = new THREEx.WebcamRenderer(renderer);

    const geom = new THREE.BoxGeometry(20, 20, 20);
    const mtl = new THREE.MeshBasicMaterial({color: 0xff0000});
    const box = new THREE.Mesh(geom, mtl);
    // arjs.add(box, -0.72, 51.051); 


    // arjs.fakeGps(-0.72, 51.05);

    requestAnimationFrame(render);

    function render() {
        if(canvas.width != canvas.clientWidth || canvas.height != canvas.clientHeight) {
            renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
            const aspect = canvas.clientWidth/canvas.clientHeight;
            camera.aspect = aspect;
            camera.updateProjectionMatrix();
        }
        // cam.update();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
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
