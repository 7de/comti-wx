export default {
    // 获取站点
    getMarker: 'sites/sites/queryMapSiteList',

    // 获取个人信息
    getCustomerInfo: 'customer/platform/customer/getCustomerByToken',
    // 获取卡列表
    getCardList: 'customer/platform/smartCard/findCtkSmartCardList',
    // 获取卡号信息
    getCardInfo: 'customer/platform/smartCard/findSmartCardByCode',
    // 提交绑定卡
    postCardBind: 'customer/platform/smartCard/updateCtkSmartCard',
    // 提交解绑卡
    postCardUnbind: 'customer/platform/smartCard/updateUntieCard',

    // 获取账户余额
    getWallet: 'wallet/customWallet/queryBalanceBySession',
    // 获取余额明细
    getWalletRecord: 'order/refundOrder/queryBalanceSub',
    // 获取充值记录
    getTopupRecord: 'order/rechargeOrder/queryRechargeRecords',
    // 获取设备状态
    getEquipStatus: 'equip/equipSocket/querySocketStatus',
    // 获取预估金额
    getMoney: 'server/getServerPayInfo',
    // 提交开始充电
    postChargeStart: 'server/chargeStart',
    // 结束充电
    postChargeEnd: 'server/chargeEnd/',
    // 获取充电数据
    getChargeInfo: 'server/queryOrderBrief/',
    // 获取订单
    getOrder: 'server/queryOrderNoListMobile',

    // 提交支付（支付宝）
    postAliPay: 'ali/Alipay/jsapi/pay',
    // 提交授权（支付宝）
    postAliAuthorize: 'ali/aliLogin/login',

    // 提交支付（微信）
    postWxPay: 'wxpay/wxpay/jsapi/pay',
    // 提交授权（微信）
    postWxAuthorize: 'wxpay/weChat/wechatLogin'
}