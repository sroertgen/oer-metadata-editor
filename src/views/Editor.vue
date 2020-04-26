<template>
  <div class="editor">
    <app-editor></app-editor>
  </div>
</template>

<script>
// @ is an alias to /src
import AppEditor from '@/components/AppEditor.vue';

export default {
  name: 'Editor',
  components: {
    AppEditor
  }
};
</script>
