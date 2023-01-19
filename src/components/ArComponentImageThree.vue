<template>
  <div id="ARScene"></div>
</template>

<script>
import * as THREE from "three";
import {
  ArToolkitProfile,
  ArToolkitSource,
  ArToolkitContext,
  ArMarkerControls,
} from "ar-js-org/three.js/build/ar-threex.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { onMounted } from "@vue/runtime-core";
export default {
  name: "ARScene",
  setup() {
    // NOTE: this components uses a camera_para.dat used by ArToolKitContext, 
    // im not sure how to get rid of it

    
    onMounted(() => {
      ArToolkitContext.baseURL = "./";

      // init renderer
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });

      renderer.setClearColor(new THREE.Color("lightgrey"), 0);
      // renderer.setPixelRatio( 2 );
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.top = "0px";
      renderer.domElement.style.left = "0px";
      document.body.appendChild(renderer.domElement); // We should be able to specify an html element to append AR.js related elements to.

      // array of functions for the rendering loop
      let onRenderFcts = [];

      // init scene and camera
      const scene = new THREE.Scene();

      //////////////////////////////////////////////////////////////////////////////////
      //		Initialize a basic camera
      //////////////////////////////////////////////////////////////////////////////////

      // Create a camera
      const camera = new THREE.Camera();
      scene.add(camera);
      const artoolkitProfile = new ArToolkitProfile();
      artoolkitProfile.sourceWebcam(); // Is there good reason for having a function to set the sourceWebcam but not the displayWidth/Height etc?

      // add existing parameters, this is not well documented
      let additionalParameters = {
        // Device id of the camera to use (optional)
        deviceId: null,
        // resolution of at which we initialize in the source image
        sourceWidth: 640,
        sourceHeight: 480,
        // resolution displayed for the source
        displayWidth: 640,
        displayHeight: 480,
      };

      Object.assign(artoolkitProfile.sourceParameters, additionalParameters);

      const arToolkitSource = new ArToolkitSource(
        artoolkitProfile.sourceParameters
      );

      arToolkitSource.init(function onReady() {
        onResize();
      });

      // handle resize
      window.addEventListener("resize", function () {
        onResize();
      });

      // resize is not called for the canvas on init. The canvas with the cube seems to be resized correctly at start.
      // Is that maybe a vue-specific problem?
      function onResize() {
        arToolkitSource.onResizeElement();
        arToolkitSource.copyElementSizeTo(renderer.domElement);
        if (arToolkitContext.arController !== null) {
          arToolkitSource.copyElementSizeTo(
            arToolkitContext.arController.canvas
          );
        }
      }

      ////////////////////////////////////////////////////////////////////////////////
      //          initialize arToolkitContext
      ////////////////////////////////////////////////////////////////////////////////

      // create atToolkitContext
      const arToolkitContext = new ArToolkitContext({
        debug: false,
        cameraParametersUrl: ArToolkitContext.baseURL + "data/camera_para.dat",
        detectionMode: "mono",
        canvasWidth: 640,
        canvasHeight: 490,
        imageSmoothingEnabled: true, // There is still a warning about mozImageSmoothingEnabled when using Firefox
      });

      // initialize it
      arToolkitContext.init(function onCompleted() {
        // copy projection matrix to camera
        camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
      });

      // update artoolkit on every frame
      onRenderFcts.push(function () {
        if (arToolkitSource.ready === false) return;

        arToolkitContext.update(arToolkitSource.domElement);
      });

      ////////////////////////////////////////////////////////////////////////////////
      //          Create a ArMarkerControls
      ////////////////////////////////////////////////////////////////////////////////

      const markerGroup = new THREE.Group();
      scene.add(markerGroup);

      const markerControls = new ArMarkerControls(
        arToolkitContext,
        markerGroup,
        {
          type: "pattern",
          patternUrl: ArToolkitContext.baseURL + "data/patt.hiro",
          smooth: true,
          smoothCount: 5,
          smoothTolerance: 0.01,
          smoothThreshold: 2,
        }
      );
      //////////////////
      // add light /////
      //////////////////

      const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 2);
      hemiLight.color.setHSL(0.6, 1, 0.6);
      hemiLight.groundColor.setHSL(0.095, 1, 0.75);
      hemiLight.position.set(0, 50, 0);
      scene.add(hemiLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 1);
      dirLight.color.setHSL(0.1, 1, 0.95);
      dirLight.position.set(-1, 1.75, 1);
      dirLight.position.multiplyScalar(30);
      scene.add(dirLight);

      dirLight.castShadow = true;

      dirLight.shadow.mapSize.width = 2048;
      dirLight.shadow.mapSize.height = 2048;

      const d = 50;

      dirLight.shadow.camera.left = -d;
      dirLight.shadow.camera.right = d;
      dirLight.shadow.camera.top = d;
      dirLight.shadow.camera.bottom = -d;

      dirLight.shadow.camera.far = 3500;
      dirLight.shadow.bias = -0.0001;

      //////////////////////////////////////////////////////////////////////////////////
      //		add an object in the scene
      //////////////////////////////////////////////////////////////////////////////////

      const markerScene = new THREE.Scene();
      markerGroup.add(markerScene);

      const mesh = new THREE.AxesHelper();
      markerScene.add(mesh);

      const loader = new GLTFLoader();
      loader.load(
        "https://cdn.aframe.io/examples/ar/models/triceratops/scene.gltf",
        function (gltf) {
          gltf.scene.scale.set(0.01, 0.01, 0.01);
          // gltf.scene.scale.rotation(0.0, 90, 0);
          // gltf.scene.position.set(1, 0.01, -1);
          markerScene.add(gltf.scene);
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );
      //////////////////////////////////////////////////////////////////////////////////
      //		render the whole thing on the page
      //////////////////////////////////////////////////////////////////////////////////
      onRenderFcts.push(function () {
        renderer.render(scene, camera);
      });

      // run the rendering loop
      let lastTimeMsec = null;
      requestAnimationFrame(function animate(nowMsec) {
        // keep looping
        requestAnimationFrame(animate);
        // measure time
        lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60;
        const deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
        lastTimeMsec = nowMsec;
        // call each update function
        onRenderFcts.forEach(function (onRenderFct) {
          onRenderFct(deltaMsec / 1000, nowMsec / 1000);
        });
      });
    });
  },
};
</script>

<style>
</style>