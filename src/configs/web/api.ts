import mockApi from './api.mock'

const API = {
  MENU_LIST: '/menus',

  ROUTE_LIST: '/mock/routes.json'
}

// eslint-disable-next-line
let api: any
const mode = process.env.VUE_APP_CURRENT_MODE
if (mode === 'mock') {
  api = { ...API, ...mockApi }
} else {
  api = { ...mockApi, ...API }
}

export default api
