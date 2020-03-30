import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './icons'; // icon
/* 引入全局样式表 */
import './style/reset.css';
import './style/main.less';


import App from './App.vue';

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
