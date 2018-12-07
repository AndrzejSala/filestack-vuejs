<template>
  <li class="listElement">
    <md-checkbox class="selected" v-model="selectedFiles" :value="item.id">Array</md-checkbox>
    <div class="thumbnail">
      <img :src="item.url" class="img-responsive img-thumbnail" :alt="item.originalName">
    </div>
    <p class="title">{{item.originalName}}</p>
    <p class="extension">{{item.extension}}</p>
    <p class="size">{{item.size}} Bytes</p>
  </li>
</template>

<script>
export default {
  name: "listElement",
  props: {
    item: Object
  },
  computed: {
    selectedFiles: {
      get() {
        return this.$store.getters.files
          .filter(item => {
            return item.isSelected;
          })
          .map(item => {
            return item.id;
          });
      },
      set(newValue) {
        this.$store.commit('selectFile', newValue)
      }
    }
  }
};
</script>

<style lang="scss">
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
</style>
