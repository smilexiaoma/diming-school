import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/user'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录', noAuth: true }
  },
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/statistics/Dashboard.vue'),
        meta: { title: '数据概览', icon: 'DataAnalysis' }
      },
      // 用户管理
      {
        path: 'user/list',
        name: 'UserList',
        component: () => import('@/views/user/UserList.vue'),
        meta: { title: '用户列表', icon: 'User' }
      },
      {
        path: 'user/verify',
        name: 'UserVerify',
        component: () => import('@/views/user/UserVerify.vue'),
        meta: { title: '实名认证审核', icon: 'Checked' }
      },
      // 内容管理
      {
        path: 'content/audit',
        name: 'ContentAudit',
        component: () => import('@/views/content/ContentAudit.vue'),
        meta: { title: '内容审核', icon: 'Document' }
      },
      {
        path: 'content/report',
        name: 'ReportList',
        component: () => import('@/views/content/ReportList.vue'),
        meta: { title: '举报处理', icon: 'Warning' }
      },
      {
        path: 'content/sensitive',
        name: 'SensitiveWords',
        component: () => import('@/views/content/SensitiveWords.vue'),
        meta: { title: '敏感词库', icon: 'EditPen' }
      },
      {
        path: 'content/ai-config',
        name: 'AIConfig',
        component: () => import('@/views/content/AIConfig.vue'),
        meta: { title: 'AI审核配置', icon: 'MagicStick' }
      },
      {
        path: 'content/audit-history',
        name: 'AuditHistory',
        component: () => import('@/views/content/AuditHistory.vue'),
        meta: { title: '审核历史', icon: 'Clock' }
      },
      {
        path: 'content/post',
        name: 'PostList',
        component: () => import('@/views/content/PostList.vue'),
        meta: { title: '帖子管理', icon: 'Notebook' }
      },
      {
        path: 'content/vote',
        name: 'VoteList',
        component: () => import('@/views/content/VoteList.vue'),
        meta: { title: '投票管理', icon: 'Finished' }
      },
      {
        path: 'content/love',
        name: 'LoveList',
        component: () => import('@/views/content/LoveList.vue'),
        meta: { title: '交友管理', icon: 'Connection' }
      },
      {
        path: 'content/comment',
        name: 'CommentList',
        component: () => import('@/views/content/CommentList.vue'),
        meta: { title: '评论管理', icon: 'ChatLineSquare' }
      },
      // 交易管理
      {
        path: 'trade/order',
        name: 'OrderList',
        component: () => import('@/views/trade/OrderList.vue'),
        meta: { title: '订单查询', icon: 'List' }
      },
      {
        path: 'trade/dispute',
        name: 'DisputeList',
        component: () => import('@/views/trade/DisputeList.vue'),
        meta: { title: '交易纠纷', icon: 'ChatDotSquare' }
      },
      {
        path: 'trade/refund',
        name: 'RefundList',
        component: () => import('@/views/trade/RefundList.vue'),
        meta: { title: '退款管理', icon: 'RefreshLeft' }
      },
      {
        path: 'trade/flow',
        name: 'FundFlow',
        component: () => import('@/views/trade/FundFlow.vue'),
        meta: { title: '资金流水', icon: 'Money' }
      },
      {
        path: 'trade/errand',
        name: 'ErrandList',
        component: () => import('@/views/trade/ErrandList.vue'),
        meta: { title: '跑腿管理', icon: 'Van' }
      },
      {
        path: 'trade/idle',
        name: 'IdleList',
        component: () => import('@/views/trade/IdleList.vue'),
        meta: { title: '闲置管理', icon: 'ShoppingCart' }
      },
      {
        path: 'trade/auction',
        name: 'AuctionList',
        component: () => import('@/views/trade/AuctionList.vue'),
        meta: { title: '拍卖管理', icon: 'PriceTag' }
      },
      // 数据统计
      {
        path: 'statistics/user',
        name: 'UserStatistics',
        component: () => import('@/views/statistics/UserStatistics.vue'),
        meta: { title: '用户增长', icon: 'TrendCharts' }
      },
      {
        path: 'statistics/active',
        name: 'ActiveStatistics',
        component: () => import('@/views/statistics/ActiveStatistics.vue'),
        meta: { title: '活跃度分析', icon: 'DataLine' }
      },
      {
        path: 'statistics/trade',
        name: 'TradeStatistics',
        component: () => import('@/views/statistics/TradeStatistics.vue'),
        meta: { title: '交易数据', icon: 'Goods' }
      },
      {
        path: 'statistics/income',
        name: 'IncomeStatistics',
        component: () => import('@/views/statistics/IncomeStatistics.vue'),
        meta: { title: '收入统计', icon: 'Wallet' }
      },
      {
        path: 'statistics/module',
        name: 'ModuleStatistics',
        component: () => import('@/views/statistics/ModuleStatistics.vue'),
        meta: { title: '模块统计', icon: 'Grid' }
      },
      // 系统设置
      {
        path: 'system/permission',
        name: 'Permission',
        component: () => import('@/views/system/Permission.vue'),
        meta: { title: '权限管理', icon: 'Lock' }
      },
      {
        path: 'system/config',
        name: 'SystemConfig',
        component: () => import('@/views/system/SystemConfig.vue'),
        meta: { title: '参数配置', icon: 'Setting' }
      },
      {
        path: 'system/notice',
        name: 'NoticeManage',
        component: () => import('@/views/system/NoticeManage.vue'),
        meta: { title: '公告发布', icon: 'Bell' }
      },
      {
        path: 'system/version',
        name: 'VersionManage',
        component: () => import('@/views/system/VersionManage.vue'),
        meta: { title: '版本管理', icon: 'Upload' }
      },
      {
        path: 'system/message',
        name: 'MessageManage',
        component: () => import('@/views/system/MessageManage.vue'),
        meta: { title: '系统消息', icon: 'Message' }
      },
      {
        path: 'system/chat',
        name: 'ChatRecord',
        component: () => import('@/views/system/ChatRecord.vue'),
        meta: { title: '聊天记录', icon: 'ChatDotRound' }
      },
      {
        path: 'system/group',
        name: 'GroupManage',
        component: () => import('@/views/system/GroupManage.vue'),
        meta: { title: '群管理', icon: 'UserFilled' }
      },
      {
        path: 'system/admin',
        name: 'AdminManage',
        component: () => import('@/views/system/AdminManage.vue'),
        meta: { title: '管理员管理', icon: 'Avatar' }
      },
      {
        path: 'system/log',
        name: 'OperationLog',
        component: () => import('@/views/system/OperationLog.vue'),
        meta: { title: '操作日志', icon: 'Document' }
      },
      {
        path: 'system/banner',
        name: 'BannerManage',
        component: () => import('@/views/system/BannerManage.vue'),
        meta: { title: '轮播图管理', icon: 'Picture' }
      },
      {
        path: 'system/category',
        name: 'CategoryManage',
        component: () => import('@/views/system/CategoryManage.vue'),
        meta: { title: '分类管理', icon: 'Menu' }
      },
      {
        path: 'system/school',
        name: 'SchoolManage',
        component: () => import('@/views/system/SchoolManage.vue'),
        meta: { title: '学校管理', icon: 'School' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || '后台管理'} - 递明校园`

  if (to.meta.noAuth) {
    next()
    return
  }

  const token = localStorage.getItem('admin_token')
  if (!token) {
    next('/login')
    return
  }

  next()
})

export default router
