<template>
  <v-container>
    <v-row align="center" justify="center">
      <h1>Vocabulary Page</h1>
      <v-spacer></v-spacer>
      <v-select :items="languageOptions"></v-select>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      languageOptions: ['Deutsch', 'English']
    };
  }
};
</script>