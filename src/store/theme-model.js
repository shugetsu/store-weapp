import { createStore } from '@mpxjs/core'
import util from '@/utils/util'
import request from '@/utils/request'

const themeModel = createStore({
  state: {
    ThemeList: {},
    ThemeDetail: {}
  },
  mutations: {
    SET_THEME_LIST (state, payload) { state.ThemeList = payload },
    SET_THEME_DETAIL (state, payload) { state.ThemeDetail = payload }
  },
  actions: {
    // 获取专题列表
    async GetThemeList (context) {
      const res = await request.get('/api/client/v1/theme/getThemeList')
      const data = util.filterResponse(res, [])
      context.commit('SET_THEME_LIST', data)
      return res
    },
    // 获取专题详情 id 专题id
    async GetThemeDetail (context, params) {
      const res = await request.get('/api/client/v1/theme/getThemeDetail', params)
      const data = util.filterResponse(res, {})
      context.commit('SET_THEME_DETAIL', data)
      return res
    }
  }
})

export default themeModel
