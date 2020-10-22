import Vue from 'vue';
import App from './App.vue';

import router from './configs/router';
// 动态路由，路由守卫
import './configs/router/permission';
import store from './configs/store';
import i18n from './configs/i18n';

import web from './configs/web';
Vue.prototype.$api = web.api;
Vue.prototype.$http = web.http;

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh');
import accounting from 'accounting';
Vue.prototype.$moment = moment;
Vue.prototype.$accounting = accounting;
// icon 自定义svg标签
import './configs/icon';
// 引入 Ant Design
import Antd from 'ant-design-vue';
Vue.use(Antd);

import './assets/style.less';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
