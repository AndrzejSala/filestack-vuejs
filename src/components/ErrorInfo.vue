<template>
    <div>
      <h2>Uploaded failed.</h2>
      <p>
        <a href="javascript:void(0)" @click="reset()">Try again</a>
      </p>
      <pre>{{ uploadError }}</pre>
    </div>
</template>

<script>
export default {
  name: "errorInfo",
  computed: {
    uploadError() {
      return this.$store.getters.uploadError
    }
  }
};
</script>

<style lang="scss">
</style>
