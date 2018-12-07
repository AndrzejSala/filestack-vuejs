<template>
    <form enctype="multipart/form-data" novalidate>
      <div class="dropbox">
        <input
          type="file"
          multiple
          name="files"
          @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
          accept="image/*"
          class="input-file"
        >
        <p v-if="isInitial">Drag your file(s) here to begin
          <br>or click to browse
        </p>
      </div>
    </form> 
</template>

<script>
import { upload } from "./../services/file-upload.fake.service"; // fake service
import statuses from "./../consts/statuses"


export default {
  name: "dropBox",
  computed: {
    isInitial() {
      return this.$store.getters.currentStatus === statuses.INITIAL;
    },
    files() {
      return this.$store.getters.files
    }
  },
  methods: {
    save(formData) {
      this.$store.commit('setStatus', statuses.IMPORT)
      upload(formData)
        .then(newFiles => {
          this.$store.commit('addFiles', newFiles)
          this.$store.commit('setStatus', statuses.SUCCESS)
        })
        .catch(err => {
          this.$store.commit('setError', err.response)
          this.$store.commit('setStatus', statuses.FAILED)
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

<style lang="scss">
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
  &:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }
  .input-file {
    opacity: 0; /* invisible but it's there! */
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

