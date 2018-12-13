<template>
  <form enctype="multipart/form-data" novalidate>
    <div class="dropbox">
      <input
        type="file"
        multiple
        name="files"
        @change="filesChange($event.target.files)"
        class="input-file"
      >
      <i class="cloud-icon material-icons md-48">cloud_upload</i>
      <p class="importPrompt">Drag your file(s) here to begin
        <br>or click to browse
      </p>
    </div>
  </form>
</template>

<script>
import { filesImport } from "./../helpers/fileImportHelper";
import statuses from "./../consts/statuses";

export default {
  name: "dropBox",
  computed: {
    isInitial() {
      return this.$store.getters.currentStatus === statuses.INITIAL;
    },
    files() {
      return this.$store.getters.files;
    }
  },
  methods: {
    save(formData) {
      this.$store.commit("setStatus", statuses.IMPORT);
      filesImport(formData).then(newFiles => {
        this.$store.commit("addFiles", newFiles);
        newFiles.forEach(file => {
          if (["jpg", "jpeg"].includes(file.extension)) {
            let exifWorker = new Worker("./exifWorker.js");
            exifWorker.postMessage(file.originalData);
            exifWorker.onmessage = e => {
              let payload = {
                id: file.id,
                exif: e.data
              };
              this.$store.commit("addExif", payload);
            };
          }
        });
      });
    },
    filesChange(fileList) {
      const formData = new FormData();
      if (!fileList.length) return;
      Array.from(Array(fileList.length).keys()).map(x => {
        formData.append("files", fileList[x], fileList[x].name);
      });
      this.save(formData);
    }
  }
};
</script>

<style scoped lang="scss">
.dropbox {
  outline: 2px dashed grey;
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px;
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  &:hover {
    background: lightblue;
  }
  .cloud-icon {
    font-size: 48px;
  }
  .input-file {
    opacity: 0;
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }
  .importPrompt {
    font-size: 16px;
    margin: 10px 0;
    text-align: center;
  }
}
</style>
