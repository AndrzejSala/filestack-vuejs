<template>
  <div class="fileUploader">
    <!--IMPORT-->
    <DropBox v-if="isInitial"/>
    <!--SUCCESS-->
    <FilesList v-if="isImport || isUpload || isSuccess"/>
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
    isImport() {
      return this.$store.getters.currentStatus === statuses.IMPORT;
    },
    isUpload() {
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

<style scoped lang="scss">
</style>
