<template>
  <v-tabs class="Tabs" :value="$nuxt.$route.name" slider-color="saber">
    <v-tab
      v-for="route in routes"
      :key="route.value"
      :to="route.to"
      :value="route.value"
      nuxt
      class="font-weight-light"
    >
      {{ route.name }}
    </v-tab>
  </v-tabs>
</template>
<script>
import routes from '../config/routes'
export default {
  data: () => ({
    routes,
  }),
}
</script>
<style lang="scss">
.Tabs {
  height: 56px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  .v-tab {
    font-family: 'UniNeue-HeavyItalic';
    font-weight: bold;
  }
}
</style>
