import Vue from 'vue';
import { from } from 'rxjs';
import { fetchIsAuthoring, getICEAttributes }  from '@craftercms/experience-builder';

Vue.mixin({
  methods: {
    getIce({ model, fieldId, index }) {
      const isAuthoring = from(fetchIsAuthoring());
      return getICEAttributes({ model, fieldId, index, isAuthoring });
    }
  }
});