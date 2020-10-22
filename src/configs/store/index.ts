import Vue from 'vue';
import Vuex, { ActionTree, MutationTree, StoreOptions } from 'vuex';
import api from '../web/api';
import http from '../web/http';
import { generateDynamicRoutes } from '../router';
import { setting } from './setting';
import { extractFields, resolveTree } from '@/shared/utils';
import { Menu } from '@/views/model';
import CONSTANT from '../constant';

Vue.use(Vuex);

export interface RootState {
  locale: string;
  menus: Array<Menu>; // 菜单
  routes: Array<any>; // 根据菜单生成的动态路由
  keepAliveList: Array<string>; // 缓存列表
  isCollapsed: boolean; // 菜单栏是否关闭
}

const state: RootState = {
  locale: CONSTANT.DEFAULT_LOCALE_KEY,
  menus: [],
  routes: [],
  keepAliveList: [],
  isCollapsed: false
};
const mutations: MutationTree<RootState> = {
  updateLocale(state, locale) {
    state.locale = locale;
  },
  updateMenus(state, menus) {
    state.menus = menus;
  },
  updateRoutes(state, routes) {
    state.routes = routes;
  },
  updateKeepAliveList(state, keepAliveList) {
    state.keepAliveList = keepAliveList;
  },
  updateIsCollapsed(state, isCollapsed) {
    state.isCollapsed = isCollapsed;
  }
};
const actions: ActionTree<RootState, RootState> = {
  updateRoutes({ commit }) {
    return new Promise((resolve, reject) => {
      http
        .get(api.MENU_LIST)
        .then(({ data }) => {
          if (data) {
            commit('updateMenus', data);
            const menus = extractFields(data, {
              alias: {
                name: 'key',
                path: 'url',
                component: 'component',
                children: 'children'
              }
            });
            const routes = generateDynamicRoutes(resolveTree(menus));
            commit('updateRoutes', routes);
            resolve(routes);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

const store: StoreOptions<RootState> = {
  modules: {
    setting
  },
  state,
  mutations,
  actions
};

export default new Vuex.Store<RootState>(store);
