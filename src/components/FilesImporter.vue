<template>
  <div class="filesImporter">
    <!--IMPORT-->
    <form enctype="multipart/form-data" novalidate v-if="isInitial">
      <div class="dropbox">
        <input
          type="file"
          multiple
          name="files"
          :disabled="isImporting"
          @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
          accept="image/*"
          class="input-file"
        >
        <p v-if="isInitial">Drag your file(s) here to begin
          <br>or click to browse
        </p>
      </div>
    </form>
    <!--SUCCESS-->
    <div v-if="isImporting || isSuccess">
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
          <!-- <li v-for="item in files" :key="item.id">
            <md-checkbox class="selected"  v-model="selectedFiles" :value="item.id">Array</md-checkbox>
            <div class="thumbnail">
              <img :src="item.url" class="img-responsive img-thumbnail" :alt="item.originalName">
            </div>
            <p class="title">{{item.originalName}}</p>
            <p class="extension">{{item.extension}}</p>
            <p class="size">{{item.size}} Bytes</p>
          </li>-->
        </ul>
      </div>
    </div>
    <!--FAILED-->
    <div v-if="isFailed">
      <h2>Uploaded failed.</h2>
      <p>
        <a href="javascript:void(0)" @click="reset()">Try again</a>
      </p>
      <pre>{{ uploadError }}</pre>
    </div>
  </div>
</template>

<script>
// swap as you need
import { upload } from "./../services/file-upload.fake.service"; // fake service
// import { upload } from './../services/file-upload.service';   // real service
import { wait } from "./../utils";
import store from "./../store";
import ListElement from "./ListElement";

const STATUS_INITIAL = 0,
  STATUS_IMPORT = 1,
  STATUS_UPLOAD = 2,
  STATUS_SUCCESS = 3,
  STATUS_FAILED = 4;

export default {
  name: "filesImporter",
  components: {
    ListElement
  },
  data() {
    return {
      uploadError: null,
      currentStatus: null
    };
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isImporting() {
      return this.currentStatus === STATUS_IMPORT;
    },
    isUploading() {
      return this.currentStatus === STATUS_UPLOAD;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },
    files() {
      return store.getFiles()
    }
  },
  methods: {
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      store.resetFiles();
      this.uploadError = null;
    },
    save(formData) {
      // upload data to the server
      this.currentStatus = STATUS_IMPORT;
      upload(formData)
        // .then(wait(1500)) // DEV ONLY: wait for 1.5s
        .then(newFiles => {
          store.addFile(newFiles)
          this.currentStatus = STATUS_SUCCESS;
        })
        .catch(err => {
          this.uploadError = err.response;
          this.currentStatus = STATUS_FAILED;
        });
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();

      if (!fileList.length) return;

      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map(x => {
        formData.append(fieldName, fileList[x], fileList[x].name);
      });

      // save it
      this.save(formData);
    }
    // checkFile(id) {
    //   console.log('###4', id)
    // }
  },
  mounted() {
    this.reset();
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