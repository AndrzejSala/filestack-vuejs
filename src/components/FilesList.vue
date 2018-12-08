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
      </div>
      <ul class="elementsWrapper">
        <ListElement v-for="item in files" :key="item.id" :item="item"/>
      </ul>
      <md-button @click="isSelectedToUpload" :disabled="isSelectedToUpload" class="md-raised md-primary">Primary</md-button>
    </div>
  </div>
</template>

<script>
import ListElement from "./ListElement";

export default {
  name: "filesList",
  components: {
    ListElement
  },
  computed: {
    files() {
      return this.$store.getters.files;
    }
    ,
    isSelectedToUpload() {
      const selectedFiles = Object.keys(this.$store.getters.files).filter(key => {
        return this.$store.getters.files[key].isSelected
      })
      return selectedFiles.length;
    }
  },
  methods: {
    reset() {
      this.$store.commit("resetStore");
    }
    // ,
    // isSelectedToUpload() {
    //   const selectedFiles = Object.keys(this.$store.getters.files).filter(key => {
    //     return this.$store.getters.files[key].isSelected
    //   })
    //   console.log('###3', selectedFiles)
    // }
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
        width: 30%;
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
    }
    .elementsWrapper {
      margin: 0;
      padding: 0;
    }
  }
}
</style>

