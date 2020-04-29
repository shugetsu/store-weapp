import { createStore } from '@mpxjs/core'
import util from '@/utils/util'
import request from '@/utils/request'

const storeImage = createStore({
  state: {
    HomeBanner: {}
  },
  mutations: {
    SET_HOME_BANNER (state, payload) { state.HomeBanner = payload }
  },
  actions: {
    // 获取轮播图 id (1=首页顶部轮播图)
    async GetBannerById (context, params) {
      const res = await request.get('/api/client/v1/banner/getBannerById', params)
      const data = util.filterResponse(res, {})
      if (params.id === 1) {
        context.commit('SET_HOME_BANNER', data)
      }
      return res
    }
  }
})

export default storeImage
