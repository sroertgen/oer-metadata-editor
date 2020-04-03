<template>
  <v-card>
    <v-toolbar dense>
      <v-toolbar-title>{{ appTitle }}</v-toolbar-title>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  name: 'AppNavigation',
  data() {
    return {
      appTitle: 'OER-Metadata-Editor'
    };
  }
};
</script>

<style scoped></style>
