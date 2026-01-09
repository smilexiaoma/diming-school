const express = require('express')
const router = express.Router()
const { successResponse } = require('../utils/response')

// 控制器
const authController = require('../controllers/authController')
const homeController = require('../controllers/homeController')
const postController = require('../controllers/postController')
const voteController = require('../controllers/voteController')
const errandController = require('../controllers/errandController')
const idleController = require('../controllers/idleController')
const loveController = require('../controllers/loveController')
const helpController = require('../controllers/helpController')
const messageController = require('../controllers/messageController')
const searchController = require('../controllers/searchController')
const userController = require('../controllers/userController')
const groupController = require('../controllers/groupController')
const regionController = require('../controllers/regionController')

// 管理后台控制器
const adminController = require('../controllers/adminController')
const adminUserController = require('../controllers/adminUserController')
const adminContentController = require('../controllers/adminContentController')
const adminReportController = require('../controllers/adminReportController')
const adminSensitiveController = require('../controllers/adminSensitiveController')
const adminAIConfigController = require('../controllers/adminAIConfigController')
const adminTradeController = require('../controllers/adminTradeController')
const adminDisputeController = require('../controllers/adminDisputeController')
const adminRefundController = require('../controllers/adminRefundController')
const adminFundController = require('../controllers/adminFundController')
const adminStatisticsController = require('../controllers/adminStatisticsController')
const adminRoleController = require('../controllers/adminRoleController')
const adminSystemController = require('../controllers/adminSystemController')
const adminNoticeController = require('../controllers/adminNoticeController')
const adminVersionController = require('../controllers/adminVersionController')
const adminPostController = require('../controllers/adminPostController')
const adminVoteController = require('../controllers/adminVoteController')
const adminErrandController = require('../controllers/adminErrandController')
const adminIdleController = require('../controllers/adminIdleController')
const adminLoveController = require('../controllers/adminLoveController')
const adminAuctionController = require('../controllers/adminAuctionController')
const adminCommentController = require('../controllers/adminCommentController')
const adminMessageController = require('../controllers/adminMessageController')
const adminChatController = require('../controllers/adminChatController')
const adminGroupController = require('../controllers/adminGroupController')
const adminAdminController = require('../controllers/adminAdminController')
const adminLogController = require('../controllers/adminLogController')
const adminBannerController = require('../controllers/adminBannerController')
const adminCategoryController = require('../controllers/adminCategoryController')
const adminSchoolController = require('../controllers/adminSchoolController')

// 健康检查
router.get('/health', (req, res) => {
  successResponse(res, { status: 'ok' }, '服务正常')
})

// ==================== 认证 ====================
router.post('/auth/login', authController.login)
router.get('/auth/userInfo', authController.getUserInfo)
router.get('/auth/testAccounts', authController.getTestAccounts)

// ==================== 首页 ====================
router.get('/home/data', homeController.getData)

// ==================== 搜索 ====================
router.get('/search', searchController.search)

// ==================== 帖子 ====================
router.get('/post/list', postController.getList)
router.get('/post/detail/:id', postController.getDetail)
router.post('/post/saveOrUpdate', postController.saveOrUpdate)
router.post('/post/like/:id', postController.like)
router.post('/post/collect/:id', postController.collect)
router.post('/post/comment/:id', postController.comment)

// ==================== 投票 ====================
router.get('/vote/list', voteController.getList)
router.get('/vote/detail/:id', voteController.getDetail)
router.post('/vote/saveOrUpdate', voteController.saveOrUpdate)
router.post('/vote/submit', voteController.submit)
router.post('/vote/comment/:id', voteController.comment)

// ==================== 跑腿 ====================
router.get('/errand/data', errandController.getData)
router.get('/errand/list', errandController.getList)
router.get('/errand/detail/:id', errandController.getDetail)
router.post('/errand/saveOrUpdate', errandController.saveOrUpdate)
router.post('/errand/accept/:id', errandController.accept)
router.post('/errand/complete/:id', errandController.complete)

// ==================== 闲置 ====================
router.get('/idle/list', idleController.getList)
router.get('/idle/detail/:id', idleController.getDetail)
router.post('/idle/saveOrUpdate', idleController.saveOrUpdate)
router.post('/idle/want/:id', idleController.want)
router.post('/idle/setTop/:id', idleController.setTop)

// ==================== 交友 ====================
router.get('/love/list', loveController.getList)
router.get('/love/detail/:id', loveController.getDetail)
router.post('/love/saveOrUpdate', loveController.saveOrUpdate)
router.post('/love/like/:id', loveController.like)
router.post('/love/comment/:id', loveController.comment)

// ==================== 互助拍卖 ====================
router.get('/help/data', helpController.getData)
router.get('/help/list', helpController.getList)
router.get('/help/detail/:id', helpController.getDetail)
router.post('/help/saveOrUpdate', helpController.saveOrUpdate)
router.post('/help/bid', helpController.bid)
router.get('/help/bidList/:id', helpController.getBidList)

// ==================== 消息 ====================
router.get('/message/list', messageController.getList)
router.get('/chat/list/:targetId', messageController.getChatList)
router.post('/chat/send', messageController.send)
router.post('/message/markRead', messageController.markRead)

// ==================== 互助群 ====================
router.get('/group/messages', groupController.getMessages)
router.post('/group/message/send', groupController.sendMessage)

// ==================== 地区 ====================
router.get('/region/list', regionController.getList)
router.get('/region/schools', regionController.getSchools)
router.get('/region/visible-options', regionController.getVisibleOptions)

// ==================== 用户中心 ====================
// 我的帖子
router.get('/user/posts', userController.getMyPosts)
router.post('/user/posts/:id/delete', userController.deletePost)

// 我的收藏
router.get('/user/collects', userController.getCollects)
router.post('/user/collects/cancel', userController.cancelCollects)

// 浏览历史
router.get('/user/history', userController.getHistory)
router.post('/user/history/:id/delete', userController.deleteHistory)
router.post('/user/history/clear', userController.clearHistory)

// 我的订单
router.get('/user/orders', userController.getOrders)
router.post('/user/orders/:id/cancel', userController.cancelOrder)
router.post('/user/orders/:id/confirm', userController.confirmOrder)
router.post('/user/orders/:id/delete', userController.deleteOrder)

// 消息通知
router.get('/user/notifications', userController.getNotifications)
router.post('/user/notifications/:id/read', userController.markNotificationRead)
router.post('/user/notifications/read-all', userController.markAllNotificationsRead)

// 设置
router.get('/user/settings', userController.getSettings)
router.post('/user/settings/update', userController.updateSetting)

// 隐私设置
router.get('/user/privacy', userController.getPrivacySettings)
router.post('/user/privacy/update', userController.updatePrivacySetting)
router.post('/user/data/download', userController.requestDataDownload)

// ==================== 管理后台 ====================
// 管理员认证
router.post('/admin/login', adminController.login)
router.get('/admin/userInfo', adminController.getUserInfo)
router.post('/admin/logout', adminController.logout)

// 用户管理
router.get('/admin/user/list', adminUserController.getList)
router.get('/admin/user/detail/:id', adminUserController.getDetail)
router.post('/admin/user/ban/:id', adminUserController.ban)
router.post('/admin/user/unban/:id', adminUserController.unban)
router.get('/admin/user/verify/list', adminUserController.getVerifyList)
router.post('/admin/user/verify/approve/:id', adminUserController.approveVerify)
router.post('/admin/user/verify/reject/:id', adminUserController.rejectVerify)
router.put('/admin/user/:id', adminUserController.update)
router.post('/admin/user/role/:id', adminUserController.assignRole)

// 内容管理
router.get('/admin/content/audit/list', adminContentController.getAuditList)
router.post('/admin/content/approve/:id', adminContentController.approve)
router.post('/admin/content/reject/:id', adminContentController.reject)
router.delete('/admin/content/:id', adminContentController.delete)
router.post('/admin/content/batch-approve', adminContentController.batchApprove)
router.post('/admin/content/batch-reject', adminContentController.batchReject)
router.get('/admin/content/audit/history', adminContentController.getAuditHistory)

// 举报管理
router.get('/admin/report/list', adminReportController.getList)
router.post('/admin/report/handle/:id', adminReportController.handle)

// 敏感词管理
router.get('/admin/sensitive/list', adminSensitiveController.getList)
router.post('/admin/sensitive/add', adminSensitiveController.add)
router.put('/admin/sensitive/:id', adminSensitiveController.update)
router.delete('/admin/sensitive/:id', adminSensitiveController.delete)
router.post('/admin/sensitive/batch', adminSensitiveController.batchAdd)

// AI审核配置
router.get('/admin/ai-config', adminAIConfigController.getConfig)
router.post('/admin/ai-config', adminAIConfigController.saveConfig)
router.post('/admin/ai-config/test', adminAIConfigController.testConfig)

// 交易管理
router.get('/admin/order/list', adminTradeController.getOrderList)
router.get('/admin/order/detail/:id', adminTradeController.getOrderDetail)
router.get('/admin/dispute/list', adminDisputeController.getDisputeList)
router.post('/admin/dispute/handle/:id', adminDisputeController.handleDispute)
router.get('/admin/refund/list', adminRefundController.getRefundList)
router.post('/admin/refund/approve/:id', adminRefundController.approveRefund)
router.post('/admin/refund/reject/:id', adminRefundController.rejectRefund)
router.get('/admin/fund/flow', adminFundController.getFundFlow)

// 数据统计
router.get('/admin/statistics/dashboard', adminStatisticsController.getDashboard)
router.get('/admin/statistics/user-growth', adminStatisticsController.getUserGrowth)
router.get('/admin/statistics/active', adminStatisticsController.getActiveData)
router.get('/admin/statistics/trade', adminStatisticsController.getTradeData)
router.get('/admin/statistics/income', adminStatisticsController.getIncomeData)
router.get('/admin/statistics/module', adminStatisticsController.getModuleStats)
router.get('/admin/statistics/export', adminStatisticsController.exportData)

// 系统设置
router.get('/admin/role/list', adminRoleController.getRoleList)
router.get('/admin/permission/list', adminRoleController.getPermissions)
router.put('/admin/role/:id', adminRoleController.updateRole)
router.get('/admin/system/config', adminSystemController.getConfig)
router.post('/admin/system/config', adminSystemController.saveConfig)
router.get('/admin/notice/list', adminNoticeController.getList)
router.post('/admin/notice', adminNoticeController.add)
router.put('/admin/notice/:id', adminNoticeController.update)
router.delete('/admin/notice/:id', adminNoticeController.delete)
router.get('/admin/version/list', adminVersionController.getList)
router.post('/admin/version', adminVersionController.add)
router.put('/admin/version/:id', adminVersionController.update)

// 帖子管理
router.get('/admin/post/list', adminPostController.getList)
router.get('/admin/post/detail/:id', adminPostController.getDetail)
router.delete('/admin/post/:id', adminPostController.delete)
router.post('/admin/post/top/:id', adminPostController.setTop)
router.post('/admin/post/featured/:id', adminPostController.setFeatured)

// 投票管理
router.get('/admin/vote/list', adminVoteController.getList)
router.get('/admin/vote/detail/:id', adminVoteController.getDetail)
router.delete('/admin/vote/:id', adminVoteController.delete)
router.post('/admin/vote/end/:id', adminVoteController.end)

// 跑腿管理
router.get('/admin/errand/list', adminErrandController.getList)
router.get('/admin/errand/detail/:id', adminErrandController.getDetail)
router.delete('/admin/errand/:id', adminErrandController.delete)
router.post('/admin/errand/cancel/:id', adminErrandController.cancel)

// 闲置管理
router.get('/admin/idle/list', adminIdleController.getList)
router.get('/admin/idle/detail/:id', adminIdleController.getDetail)
router.delete('/admin/idle/:id', adminIdleController.delete)
router.post('/admin/idle/offshelf/:id', adminIdleController.offShelf)

// 交友管理
router.get('/admin/love/list', adminLoveController.getList)
router.get('/admin/love/detail/:id', adminLoveController.getDetail)
router.delete('/admin/love/:id', adminLoveController.delete)

// 拍卖管理
router.get('/admin/auction/list', adminAuctionController.getList)
router.get('/admin/auction/detail/:id', adminAuctionController.getDetail)
router.delete('/admin/auction/:id', adminAuctionController.delete)
router.post('/admin/auction/end/:id', adminAuctionController.end)

// 评论管理
router.get('/admin/comment/list', adminCommentController.getList)
router.delete('/admin/comment/:id', adminCommentController.delete)
router.post('/admin/comment/hide/:id', adminCommentController.hide)
router.post('/admin/comment/show/:id', adminCommentController.show)

// 消息管理
router.get('/admin/message/list', adminMessageController.getList)
router.post('/admin/message/send', adminMessageController.send)
router.delete('/admin/message/:id', adminMessageController.delete)

// 聊天记录
router.get('/admin/chat/list', adminChatController.getList)
router.get('/admin/chat/detail/:id', adminChatController.getDetail)

// 群管理
router.get('/admin/group/list', adminGroupController.getList)
router.get('/admin/group/messages/:id', adminGroupController.getMessages)
router.post('/admin/group/mute/:id', adminGroupController.mute)

// 管理员管理
router.get('/admin/admin/list', adminAdminController.getList)
router.post('/admin/admin', adminAdminController.add)
router.put('/admin/admin/:id', adminAdminController.update)
router.delete('/admin/admin/:id', adminAdminController.delete)
router.post('/admin/admin/reset-password/:id', adminAdminController.resetPassword)

// 操作日志
router.get('/admin/log/list', adminLogController.getList)

// 轮播图管理
router.get('/admin/banner/list', adminBannerController.getList)
router.post('/admin/banner', adminBannerController.add)
router.put('/admin/banner/:id', adminBannerController.update)
router.delete('/admin/banner/:id', adminBannerController.delete)

// 分类管理
router.get('/admin/category/list', adminCategoryController.getList)
router.post('/admin/category', adminCategoryController.add)
router.put('/admin/category/:id', adminCategoryController.update)
router.delete('/admin/category/:id', adminCategoryController.delete)

// 学校管理
router.get('/admin/school/list', adminSchoolController.getList)
router.post('/admin/school', adminSchoolController.add)
router.put('/admin/school/:id', adminSchoolController.update)
router.delete('/admin/school/:id', adminSchoolController.delete)

module.exports = router
