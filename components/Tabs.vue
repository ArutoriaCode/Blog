<template>
  <v-tabs class="Tabs" :value="$nuxt.$route.name">
    <v-tab
      v-for="route in routes"
      :key="route.value"
      :to="route.to"
      :value="route.value"
      nuxt
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  .v-tab {
    font-family: 'UniNeue-HeavyItalic';
    font-weight: bold;
  }
}
</style>
