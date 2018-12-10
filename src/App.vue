<template>
  <div id="app">
    <h1>filestack uploader</h1>
    <FileUploader />
  </div>
</template>

<script>
import FileUploader from "./components/FileUploader.vue";
export default {
  name: "app",
  components: {
    FileUploader
  }
};
</script>

<style lang="scss">
  #app {
    margin: 20px 10px;
  }
</style>