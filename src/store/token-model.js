import { createStore } from '@mpxjs/core'
import util from '@/utils/util'
import request from '@/utils/request'

const tokenModel = createStore({
  state: {
    Token: wx.getStorageSync('Token') || {},
    UserInfo: {}
  },
  mutations: {
    SET_TOKEN (state, payload) { state.Token = payload },
    SET_USER_INFO (state, payload) { state.UserInfo = payload }
  },
  actions: {
    // 获取Token code
    async GetToken (context, params) {
      const res = await request.get('/api/client/v1/token/getToken', params)
      const data = util.filterResponse(res, {})
      context.commit('SET_TOKEN', data)
      console.log(data)
      wx.setStorageSync('Token', data)
      return res
    }
  }
})

export default tokenModel
