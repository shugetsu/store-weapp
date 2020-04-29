import { createStore } from '@mpxjs/core'
import util from '@/utils/util'
import request from '@/utils/request'
import tokenModel from './token-model'

const userAddressModel = createStore({
  deps: { tokenModel },
  state: {
    UserAddress: null
  },
  mutations: {
    SET_USER_ADDRESS (state, payload) { state.UserAddress = payload }
  },
  getters: {
    CompleteAddress: (state) => {
      if (state.UserAddress !== null) {
        const province = state.UserAddress.province
        const city = state.UserAddress.city
        const country = state.UserAddress.country
        const detail = state.UserAddress.detail
        return util.getRegionByCode(province, city, country) + detail
      }
      return ''
    }
  },
  actions: {
    // 获取用户地址
    async GetUserAddress (context) {
      const token = context.state.tokenModel.Token
      const res = await request.get('/api/client/v1/userAddress/getUserAddress', {}, { header: token })
      const data = util.filterResponse(res, null)
      context.commit('SET_USER_ADDRESS', data)
      return res
    },
    // 添加用户地址
    async AddUserAddress (context, params) {
      const token = context.state.tokenModel.Token
      const res = await request.post('/api/client/v1/userAddress/addUserAddress', params, { header: token })
      return res
    },
    // 更新用户地址
    async UpdateUserAddress (context, params) {
      const token = context.state.tokenModel.Token
      const res = await request.post('/api/client/v1/userAddress/updateUserAddress', params, { header: token })
      return res
    }
  }
})

export default userAddressModel
