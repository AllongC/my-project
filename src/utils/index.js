const baseURL = "https://api-hmugo-web.itheima.net/api/public/v1"
const request = (config) => {
    uni.showLoading({
        title: '加载中',
        mask: true
    })
    return new Promise((resolve, reject) => {
        uni.request({
            ...config,
            url: baseURL + config.url,
            success: (res) => {
                if (res.statusCode == 200 && res.data.meta.status == 200) {
                    resolve(res.data.message)
                } else {
                    reject('请求失败')
                }
            },
            fail: (res) => {
                reject(res)
            },
            complete: (res) => {
                uni.hideLoading()
            },
        })
    })
}

const requestAll = async (arr) => {
    wx.showLoading({
        title: "加载中",
        mask: true
    });
    await Promise.all(arr)
    wx.hideLoading();
    return Promise.resolve()
}


export default {
    request,
    requestAll
}