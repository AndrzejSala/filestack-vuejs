<template>
  <div id="app">
    <h1>filestack uploader</h1>
    <FilesImporter sharedState="sharedState"/>
  </div>
</template>

<script>
import FilesImporter from "./components/FilesImporter.vue";
export default {
  name: "app",
  components: {
    FilesImporter
  }
};
</script>

<style lang="scss">
</style>