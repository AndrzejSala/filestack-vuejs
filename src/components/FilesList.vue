<template>
    <div>
      <h2>Select files which you want to upload to the Filestack</h2>
      <p>
        <a href="javascript:void(0)" @click="reset()">Select files from your computer again</a>
      </p>
      <div class="filesWrapper">
        <div class="header">
          <div class="selected">Selected</div>
          <div class="thumbnail">Thumbnail</div>
          <div class="title">Title</div>
          <div class="extension">Extension</div>
          <div class="size">Size</div>
        </div>
        <ul>
          <ListElement v-for="item in files" :key="item.id" :item="item"/>
        </ul>
      </div>
    </div>
</template>

<script>
import ListElement from "./ListElement"

export default {
  name: "filesList",
  components: {
    ListElement
  },
  computed: {
    files() {
      return this.$store.getters.files
    }
  },
  methods: {
    reset() {
      this.$store.commit('resetStore')
    }
    }
  }
</script>

<style lang="scss">
.filesWrapper {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
  .header {
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
  ul {
    .selected {
      width: 10%;
      .md-checkbox-label {
        display: none;
      }
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
    li {
      width: 100%;
      height: 100px;
      position: relative;
      display: flex;
      flex-direction: row;
      margin-bottom: 20px;
      img {
        max-height: 100%;
      }
    }
  }
}
</style>

