<template>
  <v-card class="mx-auto">
    <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"></v-img>

    <v-card-title> 也许这就是人生吧 </v-card-title>

    <v-card-subtitle> 这是一段静态的文本 </v-card-subtitle>

    <v-card-actions>
      <v-btn color="error" text to="/post/1024"> 开始阅读 </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data: () => ({}),
}
</script>
