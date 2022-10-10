// 调用封装的加载界面
import { hideLoading, showLoading } from './loading'
// 你好世界
export default {
  common: {
    baseUrl: 'http://community.nnmm666.com',
    data: {},
    header: {
      // 'Content-Type': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'GET',
    dataType: 'json',
  },
  getToke() {
    if (uni.getStorageSync('token')) {
      return uni.getStorageSync('token')
    } else {
      // uni.reLaunch({
      //   // url: '/pages/community/community',
      // })
    }
  },
  request(options = {}) {
    options.url = this.common.baseUrl + options.url
    options.data = options.data || this.common.data
    this.common.header.token = this.getToke()
    options.header = options.header || this.common.header
    options.method = options.method || this.common.method
    options.dataType = options.dataType || this.common.dataType
    if ('undefined' === options.iShowLoading) {
      options.iShowLoading = true
    }
    if (options.iShowLoading) {
      showLoading({
        title: '正在加载...',
      })
    }
    return new Promise((resolve, reject) => {
      uni.request({
        ...options,
        success: result => {
          // console.log('log - returnnewPromise - result', result)
          hideLoading()
          // console.log('log - returnnewPromise - statusCode', result.data.msg)
          if (result.statusCode !== 200) {
            return reject(result.data.msg)
          }
          if (result.data.code && result.data.code != 200) {
            showLoading({
              icon: 'error',
              title: result.data.msg,
            })
            setTimeout(() => {
              hideLoading()
            }, 1000)
            reject(new Error(result.data.msg))
          }
          resolve(result.data)
        },
        fail: err => {
          // console.log('log - returnnewPromise - err', err)
          console.log(err)
        },
      })
    })
  },
}
