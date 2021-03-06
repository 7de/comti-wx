import page from './page'

import wepy from 'wepy'

// const appInstance = getApp()

export default {
  apiData : {
    // 正式
    // host: 'https://www.comtti.net/',
    // 测试
    host: 'https://actor.comtti.net/pc/',
    token: wepy.getStorageSync('token_n')
  },
  _request(method, url, params, header = {}, _token) {
    // console.log(_token)
    const { host, token } = this.apiData
    const subToken = token ? token : wepy.getStorageSync('token_n')
    const _this = this
    return new Promise((resolve, reject) => {
      let userToken = subToken
      if(!userToken){
        wepy.hideLoading()
        wepy.showModal({
          title: '温馨提示',
          content: '您暂未授权或授权已过期',
          showCancel: false,
          confirmText: '去授权',
          success: (res) => {
            if (res.confirm) {
              wepy.navigateTo({
                url: '/pages/authorize'
              })
            }
          }
        })
      } else {
        wepy.request({
          url: `${host}${url}`,
          method: method,
          data: params,
          header: Object.assign({
            'Authorization': 'Bearer ' + userToken,
            'content-type': 'application/json'
          }, header),
          success: res => {
            const {
              data
            } = res
            if (data.code === 500 || data.status === 500) {
              wepy.showToast({
                title: '服务器错误，请联系管理员',
                icon: 'none',
                duration: 2000
              })
              // resolve(this._request(method, url, params))
            } else if (data.code === -1) {
              /* wepy.showToast({
                title: data.msg ? data.msg : data.message,
                icon: 'none',
                duration: 2000
              }) */
              reject(data)
            } else if (data.code === -100) {
              wepy.navigateTo({
                url: '/pages/authorize'
              })
            } else {
              resolve(data)
            }
          },
          fail: err => {
            wepy.hideLoading()
            if (err.errMsg === 'request:fail timeout') {
              wepy.showModal({
                title: '错误提示',
                content: '请求超时，请稍后重试',
                confirmText: '我知道了',
                success: (res) => {
                  if (res.confirm) {
                  }
                }
              })
            } else {
              reject(err)
              // let _msg = err.data.msg ? err.data.msg : err.errMsg
              /* wepy.showModal({
                title: '错误提示',
                content: '网络异常，请稍后重试',
                confirmText: '我知道了',
                success: (res) => {
                }
              }) */
              console.log('请求失败')
            }
          }
        })
      }
    })
  },
  get(url, params = {}, header = {}, token) {
    return this._request('GET', url, params, header, token)
  },
  post(url, params = {}, header = {}, token) {
    return this._request('POST', url, params, header, token)
  },
  put(url, params = {}, header = {}) {
    return this._request('PUT', url, params, header)
  },
  delete(url, params = {}, header = {}) {
    return this._request('DELETE', url, params, header)
  },
  clearMsg (id) {
    return wepy.clearStorage()
  },
  // 毫秒转换成时分秒
  formatDuring (mss) {
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = parseInt((mss % (1000 * 60)) / 1000);
    return  (hours < 10 ? '0' + hours : hours) + " : " + (minutes < 10 ? '0' + minutes : minutes) + " : " + (seconds < 10 ? '0' + seconds : seconds);
  },
  // 毫秒转分钟
  formatMin(time) {
    return parseInt((time % (1000 * 60 * 60)) / (1000));
  },
  // 时间戳转换时间
  formatDate (date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str));
        }
    }
    return fmt;
  },

  // 不足10，前加零
  padLeftZero (str) {
    return ('00' + str).substr(str.length);
  },

  // 小时转换毫秒
  // 1时(h)=3600000毫秒(ms)
  // 1分(min)=60000毫秒(ms)
  // 1秒(s)=1000毫秒(ms)
  formatMs(time) {
    return time * 3600000
  },
  // 时分秒计时器
  startTime(h,m,s) {
    let _h = h
    let _m = m
    let _s = s
    _h = this.checkTime(_h)
    _m = this.checkTime(_m)
    _s = this.checkTime(_s)
  },
  checkTime(i) {
    if (i<10) {i="0" + i}
    return i
  },

  // 金额默认以分为单位，若为整数后面自动补零
  // str 分单位金额
  fotmatMoney(str) {
    let _money = (str/100).toFixed(2);
    return _money
  },
  // 智能卡显示规则 第4位自动空一格
  fotmatCard(str) {
    var _str = str.replace(/\s/g,'').replace(/(.{4})/g,"$1 ")
    return _str
  }
}
