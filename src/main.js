import Vue from 'vue';
/* 引入全局样式表 */
import './style/reset.css';
import './style/main.css';

import App from './App.vue';


Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
