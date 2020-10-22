import router from '.'
import store from '../store'
// import { storage } from '../storage'
// import CONSTANT from '../constant'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Location, NavigationGuardNext, Route } from 'vue-router'

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载icon
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})

const WHITE_LIST = ['/login']
router.beforeEach(async (to: Route, from: Route, next: NavigationGuardNext) => {
  NProgress.start()

  if (WHITE_LIST.includes(to.path) || /.json$/g.test(to.path)) {
    next()
  } else {
    // const token = storage.getItem(CONSTANT.STORAGE_OAUTH2_ACCESS_TOKEN)
    const routes = store.state.routes
    // if (!!token) {
    //   next(`/login?redirect=${to.path}`)
    // }
    if (routes.length === 0) {
      const dynamicRoutes = await store.dispatch('updateRoutes')
      if (!dynamicRoutes || dynamicRoutes.length === 0) {
        // 没有获取到动态路由信息重新登陆
        next(`/login?redirect=${to.path}`)
      } else {
        // 添加动态路由
        router.addRoutes(dynamicRoutes)
        const $to: Location = {
          name: to.name as string | undefined,
          path: to.path,
          hash: to.hash,
          query: to.query,
          params: to.params,
          replace: false
        }
        next({ ...$to })
      }
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
