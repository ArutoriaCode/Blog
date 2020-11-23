<template>
  <v-col cols="12" class="TopCarousel">
    <div class="flex-middle-between">
      <v-subheader>猜你喜欢</v-subheader>
      <v-switch
        v-model="autoPlay"
        inset
        label="自动播放"
        :dark="$vuetify.theme.dark"
        :color="`grey ${$vuetify.theme.dark ? 'lighten-4' : 'darken-4'}`"
      />
    </div>
    <v-carousel
      :show-arrows="false"
      :cycle="autoPlay"
      hide-delimiter-background
      delimiter-icon="iconfont icon-droplet"
      class="rounded"
      :height="carouselHeight"
    >
      <v-carousel-item :src="require('~/static/images/Elaina.jpg')">
        <div class="fill-height flex-bottom-center">
          <v-row class="top-row">
            <v-col cols="12">
              <a :class="_CarouselItemClass">魔女之旅（第一章）</a>
            </v-col>
            <v-col cols="12">
              <v-btn rounded to="/post/1024" :small="$vuetify.breakpoint.xs" color="error" class="read-btn">开始阅读</v-btn>
            </v-col>
          </v-row>
        </div>
      </v-carousel-item>
      <v-carousel-item :src="require('~/static/images/Elaina.jpg')">
        <div class="fill-height flex-bottom-center">
          <v-row class="top-row">
            <v-col cols="12">
              <a :class="_CarouselItemClass">魔女之旅（第二章）</a>
            </v-col>
            <v-col cols="12">
              <v-btn rounded to="/post/1024" :small="$vuetify.breakpoint.xs" color="error" class="read-btn">开始阅读</v-btn>
            </v-col>
          </v-row>
        </div>
      </v-carousel-item>
      <v-carousel-item :src="require('~/static/images/Elaina.jpg')">
        <div class="fill-height flex-bottom-center">
          <v-row class="top-row">
            <v-col cols="12">
              <a :class="_CarouselItemClass">魔女之旅（第三章）</a>
            </v-col>
            <v-col cols="12">
              <v-btn rounded to="/post/1024" :small="$vuetify.breakpoint.xs" color="error" class="read-btn">开始阅读</v-btn>
            </v-col>
          </v-row>
        </div>
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

  computed: {
    carouselHeight() {
      // 让轮播图能在各种设备下能完整的显示在可视范围内
      return this.$vuetify.breakpoint.height - 162;
    },

    _CarouselItemClass() {
      return {
        "text-decoration-none top-title": true,
        "headline": this.$vuetify.breakpoint.xs,
        "display-1": !this.$vuetify.breakpoint.xs
      }
    }
  }
}
</script>
<style lang="scss">
@import '../static/fonts/iconfont.css';
.iconfont {
  font-size: 20px !important;
  font-size: 1.25rem !important;
}

.TopCarousel {
  .v-responsive__sizer {
    background: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(rgba(49, 49, 48, 0)),
      to(rgba(22, 29, 39, 0.9))
    );
    background: linear-gradient(
      180deg,
      rgba(49, 49, 48, 0),
      rgba(22, 29, 39, 0.9)
    );
  }
  .v-responsive__content {
    position: relative;
    .top-row {
      padding: 0 36px 60px 48px;
    }
    .top-title {
      color: #fff !important;
    }
    .read-btn {
      color: #fff !important;
    }
  }
}
</style>
