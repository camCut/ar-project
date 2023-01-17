<template>
  <div class="hello">
  <!-- <img src="../assets/img/tracker1.jpg"> -->
<a-scene
    vr-mode-ui="enabled: false;"
    renderer="logarithmicDepthBuffer: true;"
    embedded
    arjs="trackingMethod: best; sourceType: webcam;debugUIEnabled: false;"
  >
    <!-- a-nft is the anchor that defines an Image Tracking entity -->
    <!-- on 'url' use the path to the Image Descriptors created before. -->
    <!-- the path should end with the name without the extension e.g. if file is 'pinball.fset' the path should end with 'pinball' -->
    <a-nft
      type="nft"
      url="../assets/img/tracker1"
      smooth="true"
      smoothCount="10"
      smoothTolerance=".01"
      smoothThreshold="5"
    >
      <!-- as a child of the a-nft entity, you can define the content to show. here's a GLTF model entity -->
      <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>

    </a-nft>
    <!-- static camera that moves according to the device movemenents -->
    <a-entity camera></a-entity>
  </a-scene>
  </div>
</template>
  
  <script >
import { defineComponent, onMounted} from "vue";

export default defineComponent({
  name: "ArTest4",
  // props: { orientation: { type: Number, required: false, default: 0 } },

  setup(props) {
    window.addEventListener("arjs-nft-loaded", (event) => {
  // Hide loading overlay
  alert('asd');
});

    return {};
  },
});
</script>
  
  <style>
   .arjs-loader {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .arjs-loader div {
    text-align: center;
    font-size: 1.25em;
    color: white;
  }
</style>
  