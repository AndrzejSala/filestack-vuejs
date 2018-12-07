<template>
  <div class="fileUploader">
    <!--IMPORT-->
    <DropBox v-if="isInitial"/>
    <!--SUCCESS-->
    <FilesList v-if="isImporting || isSuccess"/>
    <!--FAILED-->
    <ErrorInfo v-if="isFailed"/>
  </div>
</template>

<script>
import DropBox from "./DropBox";
import FilesList from "./FilesList";
import statuses from "./../consts/statuses"

export default {
  name: "fileUploader",
  components: {
    DropBox,
    FilesList
  },
  computed: {
    isInitial() {
      return this.$store.getters.currentStatus === statuses.INITIAL;
    },
    isImporting() {
      return this.$store.getters.currentStatus === statuses.IMPORT;
    },
    isUploading() {
      return this.$store.getters.currentStatus === statuses.UPLOAD;
    },
    isSuccess() {
      return this.$store.getters.currentStatus === statuses.SUCCESS;
    },
    isFailed() {
      return this.$store.getters.currentStatus === statuses.FAILED;
    }
  }
};
</script>

<style lang="scss">
</style>
