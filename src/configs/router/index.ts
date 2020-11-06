/* eslint-disable */
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/home'
  }
];

const createRouter = () =>
  new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  });

const router: any = createRouter();

export default router;

/**
 * 路由重置
 */
router.resetRouter = resetRouter;
export function resetRouter() {
  const newRouter: any = createRouter();
  router.matcher = newRouter.matcher;
}

/**
 * 动态路由，将路由信息转成RouteConfig格式
 * @param routes 后台路由数据集合
 * @returns Array<RouteConfig> 用于 router.addRoutes(dynamicRoutes);
 */
export function generateDynamicRoutes(routes: Array<any>): Array<RouteConfig> {
  const keys = ['path', 'name', 'children', 'redirect', 'meta'];
  const dynamicRoutes: Array<RouteConfig> = [];
  // 遍历路由数组去重组可用的路由
  routes.forEach(route => {
    const dynamicRoute: any = {};
    if (route.component) {
      // dynamicRoute.component = (resolve: any) =>
      //   require(['@/views/' + route.component], resolve);
      dynamicRoute.component = () => import('@/views/' + route.component);
    }
    for (const key in route) {
      if (keys.includes(key)) {
        dynamicRoute[key] = route[key];
      }
    }
    // 若遍历的当前路由存在子路由，需要对子路由进行递归遍历
    // if (dynamicRoute.children && dynamicRoute.children.length > 0) {
    //   dynamicRoute.children = generateDynamicRoutes(dynamicRoute.children);
    // }
    dynamicRoutes.push(dynamicRoute);
  });

  // 将所有动态路由添加进Index组件下
  const rootRoutes = [
    {
      name: 'index',
      path: '/',
      component: () => import('@/views/Index.vue'),
      children: dynamicRoutes
    }
  ];

  console.log('routes: ', rootRoutes);
  return rootRoutes;
}
