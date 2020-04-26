<template>
  <v-toolbar flat dense>
    <router-link class="toolbar-title" to="/">
      <v-toolbar-title>{{ appTitle }}</v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>
    <v-btn v-if="($route.name != 'Vocabulary')" to="/vocabulary" text>Vocabulary</v-btn>
    <v-btn v-if="($route.name != 'About')" to="/about" text>About</v-btn>
    <v-btn icon href="https://github.com/sroertgen/oer-metadata-editor" target="_blank">
      <v-icon>mdi-github</v-icon>
    </v-btn>
  </v-toolbar>
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

<style scoped>
.toolbar-title {
  color: inherit;
  text-decoration: inherit;
}
</style>
