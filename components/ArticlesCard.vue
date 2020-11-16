<template>
  <v-card class="mx-auto" flat>
    <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"></v-img>

    <v-card-title> 也许这就是人生吧 </v-card-title>

    <v-card-subtitle> 这是一段静态的文本 </v-card-subtitle>

    <v-card-actions>
      <v-btn color="error" text to="/post/1024"> 开始阅读 </v-btn>
      <v-spacer></v-spacer>
      <div class="d-flex justify-center align-end">
        <v-btn text x-small>
          <v-icon size="20"> mdi-eye </v-icon>
          <span class="pl-1">0</span>
        </v-btn>
        <v-btn text x-small>
          <v-icon size="20"> mdi-heart </v-icon>
          <span class="pl-1">0</span>
        </v-btn>
        <v-btn text x-small>
          <v-icon size="20"> mdi-message-processing </v-icon>
          <span class="pl-1">0</span>
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data: () => ({}),
}
</script>
