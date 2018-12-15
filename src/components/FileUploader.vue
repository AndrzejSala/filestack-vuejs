<template>
  <div class="fileUploader">
    <!--IMPORT-->
    <DropBox v-if="isInitial"/>
    <!--SUCCESS-->
    <FilesList v-if="isImport || isUpload || isSuccess"/>
    <!--FAILED-->
    <ErrorInfo v-if="isFailed"/>
  </div>
</template>

<script>
import DropBox from './DropBox'
import FilesList from './FilesList'
import ErrorInfo from './ErrorInfo'
import appConsts from './../consts/appConsts'

export default {
  name: 'fileUploader',
  components: {
    DropBox,
    FilesList,
    ErrorInfo
  },
  computed: {
    isInitial() {
      return this.$store.getters.currentStatus === appConsts.STATUSES.INITIAL;
    },
    isImport() {
      return this.$store.getters.currentStatus === appConsts.STATUSES.IMPORT;
    },
    isUpload() {
      return this.$store.getters.currentStatus === appConsts.STATUSES.UPLOAD;
    },
    isSuccess() {
      return this.$store.getters.currentStatus === appConsts.STATUSES.SUCCESS;
    },
    isFailed() {
      return this.$store.getters.currentStatus === appConsts.STATUSES.FAILED;
    }
  },
  created() {
    if (!process.env.VUE_APP_FILESTACK_API_KEY) {
      const payload = {
        currentStatus: appConsts.STATUSES.FAILED,
        error: 'Filestack app key has not been provided (should be passed from .env)!'
      }
      this.$store.commit('setStatus', payload)
    } else {
      appConsts.FILESTACK_API_KEY = process.env.VUE_APP_FILESTACK_API_KEY
    }
  }
};
</script>
