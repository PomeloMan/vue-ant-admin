/**
 * 自定义Icon配置
 */
import Vue from 'vue';
import SvgIcon from './svg-icon.vue'; // svg component

// register globally
Vue.component('svg-icon', SvgIcon);

const req = require.context('../../assets/icons', false, /\.svg$/);
const requireAll = (requireContext: any) =>
  requireContext.keys().map(requireContext);
requireAll(req);
