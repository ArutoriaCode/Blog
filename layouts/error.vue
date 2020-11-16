<template>
  <v-app>
    <div
      class="d-flex flex-column justify-center align-center"
      v-if="error.statusCode === 404"
    >
      <v-img :src="require('~/static/images/404.png')" width="320"></v-img>
      <v-subheader class="NotFound font-unineue">{{
        pageNotFound
      }}</v-subheader>
    </div>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <div class="d-flex flex-row justify-center align-center">
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

<style scoped>
h1 {
  font-size: 20px;
}
.NotFound {
  font-size: 30px;
  font-size: 2rem;
}
</style>
