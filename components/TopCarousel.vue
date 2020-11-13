<template>
  <v-col cols="12" class="TopCarousel">
    <div class="flex-middle-between">
      <v-subheader>猜你喜欢</v-subheader>
      <v-switch
        v-model="autoPlay"
        inset
        label="自动播放"
        :color="`grey ${$vuetify.theme.dark ? 'lighten-4' : 'darken-4'}`"
      />
    </div>
    <v-carousel
      :show-arrows="false"
      :cycle="autoPlay"
      hide-delimiter-background
      delimiter-icon="mdi-minus"
      class="rounded"
      height="600"
    >
      <v-carousel-item class="">
        <v-img :src="require('~/assets/images/Elaina.jpg')"></v-img>
        <v-btn>开始阅读</v-btn>
      </v-carousel-item>
      <v-carousel-item>
        <v-img :src="require('~/assets/images/Elaina.jpg')"></v-img>
        <v-btn>开始阅读</v-btn>
      </v-carousel-item>
      <v-carousel-item>
        <v-img :src="require('~/assets/images/Elaina.jpg')"></v-img>
        <div></div>
      </v-carousel-item>
    </v-carousel>
  </v-col>
</template>
<script>
export default {
  data() {
    return {
      autoPlay: true
    }
  },
}
</script>
