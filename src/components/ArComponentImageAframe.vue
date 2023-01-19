

<template>
  <div>
    <button class="btn btn-secondary" @click="test">Change sphere color</button>
    <a-scene arjs>
      <a-marker preset="hiro">
        <a-box
          position="0 0 0"
          rotation="0 0 0"
          color="#4CC3D9"
          opacity="0.5"
        ></a-box>
        <a-sphere position="0 1.25 0" radius="0.75" color="blue"></a-sphere>
        <a-cylinder
          position="0 0 2"
          radius="0.5"
          height="1.5"
          color="#FFC65D"
        ></a-cylinder>
      </a-marker>

      <a-entity camera></a-entity>
    </a-scene>
  </div>
</template>

<script>

export default {
  setup() {
    function test() {
      
      const sphere = document.querySelector("a-sphere");
      const color = sphere.getAttribute("color");
      sphere.setAttribute("color", color === "blue" ? "green" : "blue");
    }
    return { test };
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