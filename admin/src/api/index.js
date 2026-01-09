import { get, post, put, del } from '@/utils/request'

// 管理员认证
export const adminApi = {
  login: (data) => post('/admin/login', data),
  getUserInfo: () => get('/admin/userInfo'),
  logout: () => post('/admin/logout')
}

// 用户管理
export const userApi = {
  getList: (params) => get('/admin/user/list', params),
  getDetail: (id) => get(`/admin/user/detail/${id}`),
  update: (id, data) => put(`/admin/user/${id}`, data),
  ban: (id, data) => post(`/admin/user/ban/${id}`, data),
  unban: (id) => post(`/admin/user/unban/${id}`),
  assignRole: (id, data) => post(`/admin/user/role/${id}`, data),
  getVerifyList: (params) => get('/admin/user/verify/list', params),
  approveVerify: (id) => post(`/admin/user/verify/approve/${id}`),
  rejectVerify: (id, data) => post(`/admin/user/verify/reject/${id}`, data)
}

// 内容管理
export const contentApi = {
  getAuditList: (params) => get('/admin/content/audit/list', params),
  approve: (id) => post(`/admin/content/approve/${id}`),
  reject: (id, data) => post(`/admin/content/reject/${id}`, data),
  delete: (id) => del(`/admin/content/${id}`),
  batchApprove: (ids) => post('/admin/content/batch-approve', { ids }),
  batchReject: (ids, reason) => post('/admin/content/batch-reject', { ids, reason }),
  getAuditHistory: (params) => get('/admin/content/audit/history', params),
  getReportList: (params) => get('/admin/report/list', params),
  handleReport: (id, data) => post(`/admin/report/handle/${id}`, data)
}

// 帖子管理
export const postApi = {
  getList: (params) => get('/admin/post/list', params),
  getDetail: (id) => get(`/admin/post/detail/${id}`),
  delete: (id) => del(`/admin/post/${id}`),
  setTop: (id, data) => post(`/admin/post/top/${id}`, data),
  setFeatured: (id, data) => post(`/admin/post/featured/${id}`, data)
}

// 投票管理
export const voteApi = {
  getList: (params) => get('/admin/vote/list', params),
  getDetail: (id) => get(`/admin/vote/detail/${id}`),
  delete: (id) => del(`/admin/vote/${id}`),
  end: (id) => post(`/admin/vote/end/${id}`)
}

// 跑腿管理
export const errandApi = {
  getList: (params) => get('/admin/errand/list', params),
  getDetail: (id) => get(`/admin/errand/detail/${id}`),
  delete: (id) => del(`/admin/errand/${id}`),
  cancel: (id) => post(`/admin/errand/cancel/${id}`)
}

// 闲置管理
export const idleApi = {
  getList: (params) => get('/admin/idle/list', params),
  getDetail: (id) => get(`/admin/idle/detail/${id}`),
  delete: (id) => del(`/admin/idle/${id}`),
  offShelf: (id) => post(`/admin/idle/offshelf/${id}`)
}

// 交友管理
export const loveApi = {
  getList: (params) => get('/admin/love/list', params),
  getDetail: (id) => get(`/admin/love/detail/${id}`),
  delete: (id) => del(`/admin/love/${id}`)
}

// 拍卖管理
export const auctionApi = {
  getList: (params) => get('/admin/auction/list', params),
  getDetail: (id) => get(`/admin/auction/detail/${id}`),
  delete: (id) => del(`/admin/auction/${id}`),
  end: (id) => post(`/admin/auction/end/${id}`)
}

// 评论管理
export const commentApi = {
  getList: (params) => get('/admin/comment/list', params),
  delete: (id) => del(`/admin/comment/${id}`),
  hide: (id) => post(`/admin/comment/hide/${id}`),
  show: (id) => post(`/admin/comment/show/${id}`)
}

// 消息管理
export const messageApi = {
  getList: (params) => get('/admin/message/list', params),
  send: (data) => post('/admin/message/send', data),
  delete: (id) => del(`/admin/message/${id}`)
}

// 聊天记录
export const chatApi = {
  getList: (params) => get('/admin/chat/list', params),
  getDetail: (id) => get(`/admin/chat/detail/${id}`)
}

// 群管理
export const groupApi = {
  getList: (params) => get('/admin/group/list', params),
  getMessages: (id) => get(`/admin/group/messages/${id}`),
  mute: (id, data) => post(`/admin/group/mute/${id}`, data)
}

// 管理员管理
export const adminManageApi = {
  getList: (params) => get('/admin/admin/list', params),
  add: (data) => post('/admin/admin', data),
  update: (id, data) => put(`/admin/admin/${id}`, data),
  delete: (id) => del(`/admin/admin/${id}`),
  resetPassword: (id) => post(`/admin/admin/reset-password/${id}`)
}

// 操作日志
export const logApi = {
  getList: (params) => get('/admin/log/list', params)
}

// 轮播图管理
export const bannerApi = {
  getList: (params) => get('/admin/banner/list', params),
  add: (data) => post('/admin/banner', data),
  update: (id, data) => put(`/admin/banner/${id}`, data),
  delete: (id) => del(`/admin/banner/${id}`)
}

// 分类管理
export const categoryApi = {
  getList: (params) => get('/admin/category/list', params),
  add: (data) => post('/admin/category', data),
  update: (id, data) => put(`/admin/category/${id}`, data),
  delete: (id) => del(`/admin/category/${id}`)
}

// 学校管理
export const schoolApi = {
  getList: (params) => get('/admin/school/list', params),
  add: (data) => post('/admin/school', data),
  update: (id, data) => put(`/admin/school/${id}`, data),
  delete: (id) => del(`/admin/school/${id}`)
}

// 敏感词管理
export const sensitiveApi = {
  getList: (params) => get('/admin/sensitive/list', params),
  add: (data) => post('/admin/sensitive/add', data),
  update: (id, data) => put(`/admin/sensitive/${id}`, data),
  delete: (id) => del(`/admin/sensitive/${id}`),
  batchAdd: (data) => post('/admin/sensitive/batch', data)
}

// AI审核配置
export const aiConfigApi = {
  getConfig: () => get('/admin/ai-config'),
  saveConfig: (data) => post('/admin/ai-config', data),
  testConfig: (data) => post('/admin/ai-config/test', data)
}

// 交易管理
export const tradeApi = {
  getOrderList: (params) => get('/admin/order/list', params),
  getOrderDetail: (id) => get(`/admin/order/detail/${id}`),
  getDisputeList: (params) => get('/admin/dispute/list', params),
  handleDispute: (id, data) => post(`/admin/dispute/handle/${id}`, data),
  getRefundList: (params) => get('/admin/refund/list', params),
  approveRefund: (id) => post(`/admin/refund/approve/${id}`),
  rejectRefund: (id, data) => post(`/admin/refund/reject/${id}`, data),
  getFundFlow: (params) => get('/admin/fund/flow', params)
}

// 数据统计
export const statisticsApi = {
  getDashboard: () => get('/admin/statistics/dashboard'),
  getUserGrowth: (params) => get('/admin/statistics/user-growth', params),
  getActiveData: (params) => get('/admin/statistics/active', params),
  getTradeData: (params) => get('/admin/statistics/trade', params),
  getIncomeData: (params) => get('/admin/statistics/income', params),
  getModuleStats: () => get('/admin/statistics/module'),
  exportData: (params) => get('/admin/statistics/export', params)
}

// 系统设置
export const systemApi = {
  getRoleList: () => get('/admin/role/list'),
  getPermissions: () => get('/admin/permission/list'),
  updateRole: (id, data) => put(`/admin/role/${id}`, data),
  getConfig: () => get('/admin/system/config'),
  saveConfig: (data) => post('/admin/system/config', data),
  getNoticeList: (params) => get('/admin/notice/list', params),
  addNotice: (data) => post('/admin/notice', data),
  updateNotice: (id, data) => put(`/admin/notice/${id}`, data),
  deleteNotice: (id) => del(`/admin/notice/${id}`),
  getVersionList: (params) => get('/admin/version/list', params),
  addVersion: (data) => post('/admin/version', data),
  updateVersion: (id, data) => put(`/admin/version/${id}`, data)
}
