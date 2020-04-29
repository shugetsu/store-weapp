import wxService from '@/utils/wxService'
import request from '@/utils/request'

export let token = wxService.getStorageSync('Token') || undefined
export let userInfo = undefined

export default {
  async getToken () {
    const { code } = await wxService.login()
    const result = await request.get('/api/client/v1/token/getToken', { code })
    if (result.data.code === 200) {
      const data = result.data.data
      token = data
      wxService.setStorageSync('Token', data)
    } else {
      wxService.showToast({ title: result.data.msg, icon: 'error' })
    }
  },
  async getUserInfo () {
    const { authSetting } = await wxService.getSetting()
    if (authSetting['scope.userInfo']) {
      const result = await wxService.getUserInfo()
      userInfo = result.userInfo
    } else {
      wx.navigateTo({ url: '/pages/login/index' })
    }
  },
  async checkSession () {
    const result = await wxService.checkSession()
    console.log(result)
  }
}
