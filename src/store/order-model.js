import { createStore } from '@mpxjs/core'
import request from '@/utils/request'
import tokenModel from './token-model'
import util from '@/utils/util'

const userAddressModel = createStore({
  deps: { tokenModel },
  state: {
    OrderList: { count: 0, rows: [] },
    OrderDetail: {},
    Params: { page: 1, size: 10 }
  },
  mutations: {
    SET_ORDER_LIST (state, payload) {
      const rows = payload.rows.map(item => {
        const { color, text } = util.filterOrderStatus(item.status)
        item.statusText = text
        item.statusTextColor = color
        item.snapAddress = JSON.parse(item.snapAddress)
        item.snapItems = JSON.parse(item.snapItems)
        item.snapAddress.completeAddress = util.getRegionByCode(item.snapAddress.province, item.snapAddress.city, item.snapAddress.country) + item.snapAddress.detail
        return item
      })
      state.OrderList.rows = state.OrderList.rows.concat(rows)
      state.OrderList.count = payload.count
    },
    RESET_ORDER_LIST (state) {
      state.OrderList = { count: 0, rows: [] }
      state.Params = { page: 1, size: 10 }
    },
    SET_PARAMS (state, payload) { state.Params = payload },
    SET_ORDER_DETAIL (state, payload) { state.OrderDetail = payload }
  },
  actions: {
    // 下单
    async placeOrder (context, params) {
      const token = context.state.tokenModel.Token
      const res = await request.post('/api/client/v1/order/placeOrder', params, { header: token })
      return res
    },
    // 获取订单列表 { page: 1, size: 10 }
    async GetOrderList (context) {
      const token = context.state.tokenModel.Token
      const res = await request.get('/api/client/v1/order/getOrderList', context.state.Params, { header: token })
      const data = util.filterResponse(res, { count: 0, rows: [] })
      context.commit('SET_ORDER_LIST', data)
      return res
    }
  }
})

export default userAddressModel
