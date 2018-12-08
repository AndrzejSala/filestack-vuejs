<template>
  <li class="listElement">
    <md-checkbox class="selected" v-model="selectedFiles" :value="item.id">Array</md-checkbox>
    <div class="thumbnail">
      <img
        v-if="imgExtensions.includes(item.extension)"
        :src="item.fileData"
        class="img-responsive img-thumbnail"
        :alt="item.originalName"
      >
      <i v-else class="material-icons md-48">file_copy</i>
    </div>
    <div class="title">{{item.originalName}}</div>
    <div class="extension">{{item.extension}}</div>
    <div class="size">{{item.size}} Bytes</div>
  </li>
</template>

<script>
export default {
  name: "listElement",
  props: {
    item: Object
  },
  data() {
    return {
      imgExtensions: ["jpg", "jpeg", "gif", "png"],
      array: []
    };
  },
  computed: {
    selectedFiles: {
      get() {
        return this.array
      },
      set(newValue) {
        this.$store.commit("selectFile", {id: this.item.id, value: newValue.length > 0});
      }
    }
  }
};
</script>

<style lang="scss">
.listElement {
  width: 100%;
  height: 80px;
  position: relative;
  display: flex;
  flex-direction: row;
  border-bottom: 2px solid black;
  padding: 5px 0;
  box-sizing: content-box;
  display: flex;
  align-items: center;
  .selected {
    width: 10%;
    justify-content: center;
    .md-checkbox-label {
      display: none;
    }
  }
  .thumbnail {
    width: 30%;
    height: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
    .img-thumbnail {
      max-height: 100%;
    }
    .material-icons {
      font-size: 48px;
    }
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
// }
</style>
