<template>
  <v-app class="errorPage">
    <div
      class="d-flex flex-column justify-center align-center"
      v-if="error.statusCode === 404"
    >
      <v-avatar size="320">
        <v-img :src="require('~/static/images/404.png')"></v-img>
      </v-avatar>
      <v-subheader class="alert-text font-unineue">{{
        pageNotFound
      }}</v-subheader>
    </div>
    <div class="d-flex flex-column justify-center align-center" v-else>
      <v-img :src="require('~/static/images/404.png')" width="320"></v-img>
      <v-subheader class="alert-text font-unineue">{{
        otherError
      }}</v-subheader>
    </div>
    <div class="mt-10 text-center">
      <v-btn to="/" text color="saber"> 返回首页 </v-btn>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 NotFound',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style lang="scss">
.errorPage {
  .v-application--wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-height: 600px;
  }
  .alert-text {
    font-size: 30px;
    font-size: 2rem;
  }
}
</style>
