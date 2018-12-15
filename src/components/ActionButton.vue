<template>
  <md-button
    @click="upload"
    :disabled="!isSelectedToUpload || status !== 1"
    :item="files"
    class="md-raised md-primary"
  >Upload to Filestack</md-button>
</template>

<script>
import filestack from "./../services/filestackService"
import appConsts from './../consts/appConsts'

export default {
  name: "actionButton",
  computed: {
    isImport() {
      return this.$store.getters.currentStatus === appConsts.STATUSES.IMPORT;
    },
    files() {
      return this.$store.getters.files;
    },
    status() {
      return this.$store.getters.currentStatus;
    },
    isSelectedToUpload() {
      const selectedFiles = this.$store.getters.files.filter(item => {
        return item.isSelected ? item.id : false;
      });
      return selectedFiles.length > 0;
    }
  },
  methods: {
    reset() {
      this.$store.commit("resetStore");
    },
    upload() {
      this.$store.commit("setStatus", {currentStatus: appConsts.STATUSES.UPLOAD});
      const filesToUpload = this.$store.getters.files.filter(file => {
        return file.isSelected
      })
      filesToUpload.forEach(async function(file) {
        let payload = {
          id: file.id,
          progress: 0,
          startTime: parseInt(new Date().getTime() / 1000, 10)
        };
        this.$store.commit("updateUploadProgress", payload);
        const onProgress = evt => {
          payload = {
            id: file.id,
            progress: evt.totalPercent,
            bytesSent: evt.totalBytes
          };
          this.$store.commit("updateUploadProgress", payload);
        };
        const onSuccess = res => {
          payload = {
            id: file.id,
            progress: 100,
            endTime: parseInt(new Date().getTime() / 1000, 10),
            url: res.url
          };
          this.$store.commit("updateUploadProgress", payload);
        };
        const onError = (error) => {
          this.$store.commit("setStatus", {currentStatus: appConsts.STATUSES.ERROR, error});
        };
        filestack.uploadFile(appConsts.FILESTACK_API_KEY, file, onProgress, onSuccess, onError);
      }, this);
      this.$store.commit("setStatus", {currentStatus: appConsts.STATUSES.SUCCESS});
    }
  }
};
</script>
