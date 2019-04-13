import Vue from 'vue';
import IndicatorDom from './indicator.vue';

const Indicator = Vue.extend(IndicatorDom);

let instance;

export default {
  open() {
    if (!instance) {
      instance = new Indicator({
        el: document.createElement('div')
      });
    }
    if (instance.visible) return;
    document.body.appendChild(instance.$el);

    Vue.nextTick(() => {
      instance.visible = true;
    });
  },

  close() {
    if (instance) {
      instance.visible = false;
    }
  }
};
