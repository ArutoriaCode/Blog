<template>
  <v-footer>
    <div class="site-info">
      <div class="text-center">
        <a class="site-item" href="http://arutoria.com"
          >&copy; {{ new Date().getFullYear() }} arutoria.com All Rights
          Reserved.</a
        >
        <a class="site-item d-block" href="https://www.beian.miit.gov.cn/">
          粤ICP备19017010号
        </a>
      </div>
    </div>
  </v-footer>
</template>
<style lang="scss">
.v-footer {
  background: #f4f4f4;
  margin-top: 54px;
  margin-bottom: 40px;
  padding-top: 15px !important;
  padding-bottom: 15px !important;
  -webkit-transition: padding-left 0.3s;
  transition: padding-left 0.3s;
  .site-info {
    .site-item {
      font-size: 15px;
      color: #3c4248;
      margin: 6px;
    }
    .site-item.d-block {
      text-decoration: none;
      height: 20px;
      line-height: 20px;
    }
  }
}
</style>
