<template>
  <form enctype="multipart/form-data" novalidate>
    <div class="dropbox">
      <input
        type="file"
        multiple
        name="files"
        @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
        class="input-file"
      >
      <p v-if="isInitial">Drag your file(s) here to begin
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
    filesChange(fieldName, fileList) {
      const formData = new FormData();
      if (!fileList.length) return;
      Array.from(Array(fileList.length).keys()).map(x => {
        formData.append(fieldName, fileList[x], fileList[x].name);
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
  &:hover {
    background: lightblue;
  }
  .input-file {
    opacity: 0;
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }
  p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
}
</style>
