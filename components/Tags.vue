<template>
  <v-col class="tags" cols="12" lg="4">
    <v-row>
      <v-col cols="12">
        <v-subheader>全部标签</v-subheader>
        <v-card elevation="0">
          <v-chip-group column>
            <v-chip class="ma-2" color="pink" label text-color="white">
              <v-icon left> mdi-label </v-icon>
              Tags
            </v-chip>

            <v-chip class="ma-2" color="primary" label>
              <v-icon left> mdi-account-circle-outline </v-icon>
              John Leider
            </v-chip>

            <v-chip class="ma-2" color="cyan" label text-color="white">
              <v-icon left> mdi-twitter </v-icon>
              New Tweets
            </v-chip>
          </v-chip-group>
        </v-card>
      </v-col>
    </v-row>
  </v-col>
</template>
