<template>
  <div class="home">
    <app-editor></app-editor>
  </div>
</template>

<script>
// @ is an alias to /src
import AppEditor from '@/components/AppEditor.vue';

export default {
  name: 'Home',
  components: {
    AppEditor
  }
};
</script>
