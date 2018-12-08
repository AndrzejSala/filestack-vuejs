<template>
  <div class="filesList">
    <div class="header">
      <h2>Select files which you want to upload to the Filestack</h2>
      <p>
        <a href="javascript:void(0)" @click="reset()">Select files from your computer again</a>
      </p>
    </div>
    <div class="filesContainer">
      <div class="firstRow">
        <div class="selected">Selected</div>
        <div class="thumbnail">Thumbnail</div>
        <div class="title">Title</div>
        <div class="extension">Extension</div>
        <div class="size">Size</div>
        <div class="status">status</div>
      </div>
      <ul class="elementsWrapper">
        <ListElement v-for="item in files" :key="item.id" :item="item"/>
      </ul>
      <md-button
        @click="upload"
        :disabled="isSelectedToUpload"
        class="md-raised md-primary"
      >Upload to Filestack</md-button>
    </div>
  </div>
</template>

<script>
import ListElement from "./ListElement";
import * as filestack from "filestack-js";
const client = filestack.init("Ahf280VrETZO5jAW1g1w9z");

export default {
  name: "filesList",
  components: {
    ListElement
  },
  computed: {
    files() {
      return this.$store.getters.files;
    },
    isSelectedToUpload() {
      const selectedFiles = this.$store.getters.files.filter(item => {
        return item.isSelected ? item.id : false;
      });
      return selectedFiles.length === 0;
    }
  },
  methods: {
    reset() {
      this.$store.commit("resetStore");
    },
    upload() {
      const selectedFiles = this.$store.getters.files
        .filter(item => {
          return item.isSelected;
        })
        .map(item => item.id);

      this.$store.getters.files.forEach(async function(file) {
        //first update start date
        let payload = {
          id: file.id,
          progress: 0,
          startTime: parseInt(new Date().getTime() / 1000, 10)
        }
        this.$store.commit ("updateUploadProgress", payload);
        const onProgress = evt => {
          console.log(file.id, "Progress: " + evt.totalPercent, evt.totalBytes);
          let payload = {
            id: file.id,
            progress: evt.totalPercent,
            bytesSent: evt.totalBytes
          }
          this.$store.commit ("updateUploadProgress", payload);
        };
        const onSuccess = (res) => {
          let payload = {
            id: file.id,
            progress: 100,
            endTime: parseInt(new Date().getTime() / 1000, 10)
          }
          this.$store.commit ("updateUploadProgress", payload);
          console.log("success",file.id ,res);
        }
        const onError = (err) => {
          console.log("error" ,file.id ,err);
        }
        try {
          const res = await client.upload(
            file.fileData,
            { onProgress },
            { filename: file.fileName }
          );
          onSuccess(res)
        } catch (e) {
          onError(err)
        }
      }, this)
    }
  }
};
</script>

<style scoped lang="scss">
.filesList {
  .filesContainer {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: center;
    .firstRow {
      text-transform: uppercase;
      position: relative;
      display: flex;
      background: lightgreen;
      padding: 10px 0;
      .selected {
        width: 10%;
      }
      .thumbnail {
        width: 20%;
      }
      .title {
        width: 30%;
      }
      .extension {
        width: 10%;
      }
      .size {
        width: 20%;
      }
      .status {
        width: 10%;
      }
    }
    .elementsWrapper {
      margin: 0;
      padding: 0;
    }
  }
}
</style>

