<template>
  <div class="errorInfo">
    <h2>An error occured</h2>
    <p>
      <a href="javascript:void(0)" @click="reset()">Try again</a>
    </p>
    <pre class="errorWrapper">{{ error }}</pre>
  </div>
</template>

<script>
export default {
  name: "errorInfo",
  computed: {
    error() {
      return this.$store.getters.error;
    }
  }
};
</script>

<style scoped lang="scss">
.errorInfo {
  .errorWrapper {
    background: lightpink;
    border: 3px solid red;
    padding: 15px;
  }
}
</style>
