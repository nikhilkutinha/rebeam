<template>
  <div class="bg-gray-700">
    <model-viewer
      v-pre
      id="roverViewer"
      data-js-focus-visible
      auto-rotate
      camera-controls
    />
  </div>
</template>

<script>
import "@google/model-viewer";

export default {
  props: {
    src: {
      type: String,
      required: true
    }
  },
  mounted() {
    const roverViewer = document.querySelector("#roverViewer");
    roverViewer.src = this.glb();
  },
  methods: {
    glb() {
      return require(`@/assets/models/${this.src}`);
    }
  }
};
</script>

<style scoped>
model-viewer {
  width: 100%;
  height: 600px;
}
</style>
