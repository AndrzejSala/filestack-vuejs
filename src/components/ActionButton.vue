<template>
  <md-button
    @click="upload"
    :disabled="!isSelectedToUpload || status !== 1"
    :item="files"
    class="md-raised md-primary"
  >Upload to Filestack</md-button>
</template>

<script>
import * as filestack from "filestack-js";
import statuses from "./../consts/statuses";
process.env.API_KEY
const client = filestack.init("Ahf280VrETZO5jAW1g1w9z");
export default {
  name: "actionButton",
  computed: {
    isImport() {
      return this.$store.getters.currentStatus === statuses.IMPORT;
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
      this.$store.commit("setStatus", statuses.UPLOAD);
      this.$store.getters.files.forEach(async function(file) {
        let payload = {
          id: file.id,
          progress: 0,
          startTime: parseInt(new Date().getTime() / 1000, 10)
        };
        this.$store.commit("updateUploadProgress", payload);
        const onProgress = evt => {
          let payload = {
            id: file.id,
            progress: evt.totalPercent,
            bytesSent: evt.totalBytes
          };
          this.$store.commit("updateUploadProgress", payload);
        };
        const onSuccess = (res) => {
          // console.log('###', res.url)
          let payload = {
            id: file.id,
            progress: 100,
            endTime: parseInt(new Date().getTime() / 1000, 10),
            url: res.url
          };
          this.$store.commit("updateUploadProgress", payload);
        };
        const onError = () => {
          this.$store.commit("setStatus", statuses.ERROR);
        };
        try {
          const res = await client.upload(
            file.baseData,
            { onProgress },
            { filename: file.fileName }
          );
          onSuccess(res);
        } catch (err) {
          onError(err);
        }
      }, this);
      this.$store.commit("setStatus", statuses.SUCCESS);
    }
  }
};
</script>

<style>
</style>

