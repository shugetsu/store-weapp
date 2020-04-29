
class WxService {

  constructor() {
    this._init()
  }

  _init() {
    const wxSyncMethodNames = [
      'stopRecord',
      'pauseVoice',
      'stopVoice',
      'pauseBackgroundAudio',
      'stopBackgroundAudio',
      'showNavigationBarLoading',
      'hideNavigationBarLoading',
      'createAnimation',
      'createContext',
      'hideKeyboard',
      'stopPullDownRefresh'
    ]
    for (let methodName in wx) {
      this[methodName] = () => {
        const params = Array.from(arguments)
        if (wxSyncMethodNames.indexOf(methodName) !== -1 || methodName.substr(0, 2) === 'on' || /\w+Sync$/.test(methodName)) {
          return wx[methodName](...params)
        }
        return new Promise((resolve, reject) => {
          wx[methodName]({ success: res => resolve(res), fail: res => reject(res), ...params })
        })
      }
    }
  }
}

export default new WxService()
