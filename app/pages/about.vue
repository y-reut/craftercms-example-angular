<template>
  <v-row>
    <v-col class="text-center">
      <img src="/craftercms.png" alt="CrafterCMS" class="mb-5" />
      <h1
        v-bind="getIce({ model, fieldId: 'title_s' })"
      >
        {{model.title_s}}
      </h1>
    </v-col>
  </v-row>
</template>

<script>
import { fetchIsAuthoring, initInContextEditing }  from '@craftercms/experience-builder';
import { getModel } from '../lib/api';

export default {
  name: 'AboutPage',
  async asyncData() {
    const model = await getModel('/site/website/about/index.xml');
    return { model };
  },
  async mounted() {
    const isAuthoring = await fetchIsAuthoring();
    if (isAuthoring) {
      initInContextEditing({
        path: this.model.craftercms.path
      });
    }
  }
}
</script>
