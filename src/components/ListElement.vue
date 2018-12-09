<template>
  <li class="listElement">
    <div class="columnWrapper">
      <div class="selectToUpload">
        <md-checkbox :disabled="item.uploadInfo.status !== 'Not uploaded'" class="selected" v-model="selectedFiles" :value="item.id">Array</md-checkbox>
      </div>
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
      <div class="status">{{item.uploadInfo.status}}</div>
    </div>
    <div class="filestackUrl">
      {{item.uploadInfo.url}}
    </div>
    <div v-if="item.exif" class="exifInfoWrapper">
      <div :key="key" v-for="(value, key) in item.exif">
        <span class="key">{{key}}: </span>
        <span class="value">{{value}}</span>
      </div>
    </div>
    <div class="progressBarWrapper">
      <div class="progressWrapper">
        <span class="title">Progress:</span>
        <span class="value">{{item.uploadInfo.progress}}%</span>
      </div>
      <div class="avgSpeedWrapper">
        <span class="title">Avg speed:</span>
        <span class="value">{{avgSpeed}}</span>
      </div>
      <div class="currSpeedWrapper">
        <span class="title">Curr speed:</span>
        <span class="value">{{currSpeed}}</span>
      </div>
      <md-progress-bar md-mode="determinate" :md-value="item.uploadInfo.progress"></md-progress-bar>
    </div>
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
      imgExtensions: ["jpg", "jpeg", "gif", "png"]
    };
  },
  computed: {
    avgSpeed() {
      let speed = 'N/A'
      if (this.item.uploadInfo.startTime) {
        if (this.item.uploadInfo.progress > 0) {
          let diff = (this.item.uploadInfo.endTime || parseInt(new Date().getTime() / 1000, 10)) - this.item.uploadInfo.startTime
          speed = (((this.item.uploadInfo.progress / 100) * this.item.size) / diff)
          speed = `${parseInt(speed / 1000, 10)}KB/s`
        } else {
          speed = `${0}KB/s`
        }
      }
      return speed
    },
    currSpeed() {
      let speed = 'N/A'
      if (this.item.uploadInfo.startTime) {
        if (this.item.uploadInfo.progress > 0) {
          speed = `${parseInt(this.item.uploadInfo.lastChunkSize / 1000, 10)}KB/s`
        } else {
          speed = `${0}KB/s`
        }
      }
      return speed
    },
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
        this.$store.commit("selectFile", newValue);
      }
    }
  }
};
</script>

<style lang="scss">
.listElement {
  width: 100%;
  position: relative;
  border-bottom: 2px solid black;
  padding: 5px 0;
  box-sizing: content-box;
  .columnWrapper {
    width: 100%;
    height: 80px;
    position: relative;
    display: flex;
    flex-direction: row;
    display: flex;
    align-items: center;
    .selectToUpload {
      width: 10%;
      .selected {
        justify-content: center;
        .md-checkbox-label {
          display: none;
        }
      }
    }
    .thumbnail {
      width: 20%;
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
    .status {
      width: 10%;
      font-weight: bold;
    }
  }
  .progressBarWrapper {
    text-align: left;
    padding: 10px 0;
    .progressWrapper,
    .avgSpeedWrapper,
    .currSpeedWrapper {
      background: lightgreen;
      margin: 5px 0;
      padding: 3px 0;
      .title {
        padding-right: 5px;
      }
      .value {
        font-weight: bold;
      }
      display: inline-block;
      padding-right: 30px;
    }
  }
  .exifInfoWrapper {
    margin-top: 20px;
    text-align: left;
    .key {
      font-weight: bold;
    }
  }
  .filestackUrl {
    font-weight: bold;
    text-align: left;
    margin-top: 20px;
  }
}
</style>
