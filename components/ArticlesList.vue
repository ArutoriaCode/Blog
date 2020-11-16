<template>
  <v-col cols="12" lg="8" class="ArticlesList">
    <div class="flex-middle-between">
      <v-subheader>全部文章</v-subheader>
      <v-switch
        inset
        disabled
        label="列表形式"
        :color="`grey ${$vuetify.theme.dark ? 'lighten-4' : 'darken-4'}`"
      />
    </div>
    <slot></slot>
  </v-col>
</template>
<style lang="scss">
.pc {
  .ArticlesList {
    padding-right: 4%;
    padding-left: 0%;
  }
}
</style>