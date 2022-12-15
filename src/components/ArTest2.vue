<template>
  <div class="hello" id="canvas" ref="canvas">
   
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import * as THREE from 'three';
import * as THREEx from '../../node_modules/@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js';

export default defineComponent({
  name: "ArTest2",
 setup() {
    // const canvas: any = document.getElementById('canvas');
    const canvas = ref();

    
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 1.33, 0.1, 10000);
const renderer = new THREE.WebGLRenderer({canvas: canvas.value});

const arjs = new THREEx.LocationBased(scene, camera);
const cam = new THREEx.WebcamRenderer(renderer);

const geom = new THREE.BoxGeometry(20000, 20000, 20000);
const mtl = new THREE.MeshBasicMaterial({color: 0xff00ff });
const box = new THREE.Mesh(geom, mtl);

// Create the device orientation tracker
const deviceOrientationControls = new THREEx.DeviceOrientationControls(camera);

// Change this to a location close to you (e.g. 0.001 degrees of latitude north of you)
arjs.add(box, 8.647390, 50.085953); 
arjs.fakeGps(8.647390, 50.085953)

// arjs.startGps();

requestAnimationFrame(render);

function render() {
    if(canvas.value.width != canvas.value.clientWidth || canvas.value.height != canvas.value.clientHeight) {
        renderer.setSize(canvas.value.clientWidth, canvas.value.clientHeight, false);
        const aspect = canvas.value.clientWidth/canvas.value.clientHeight;
        camera.aspect = aspect;
        camera.updateProjectionMatrix();
    }

    // Update the scene using the latest sensor readings
    deviceOrientationControls.update();

    cam.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}


    onMounted(( )=> {
      if(canvas.value) {
        requestAnimationFrame(render);

        console.log(document.querySelector('a-scene'));
      }
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
