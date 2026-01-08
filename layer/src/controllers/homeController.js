const { successResponse } = require('../utils/response')

// 获取首页数据
const getData = (req, res) => {
  const data = {
    // 轮播图
    bannerList: [
      { id: 1, image: 'https://iph.href.lu/750x300?text=轮播图1', url: '' },
      { id: 2, image: 'https://iph.href.lu/750x300?text=轮播图2', url: '' },
      { id: 3, image: 'https://iph.href.lu/750x300?text=轮播图3', url: '' }
    ],
    // 导航分类（扩展到18个以填充3行×6列）
    navList: [
      { id: 1, name: '秘密树洞的一个', icon: '', url: '/pages/post/index' },
      { id: 2, name: '官方的大大外卖', icon: '', url: '/pages/errand/index' },
      { id: 3, name: '表白墙哦哦哦哦', icon: '', url: '/pages/love/index' },
      { id: 4, name: '失物招领阿萨德', icon: '', url: '/pages/idle/index' },
      { id: 5, name: '互助群', icon: '', url: '/pages/help/index' },
      { id: 6, name: '投票', icon: '', url: '/pages/vote/index' },
      { id: 7, name: '校园跑腿', icon: '', url: '/pages/errand/index' },
      { id: 8, name: '闲置习交流市场', icon: '', url: '/pages/idle/index' },
      { id: 9, name: '社团活动', icon: '', url: '' },
      { id: 10, name: '学习交流习交流', icon: '', url: '' },
      { id: 11, name: '兼职信息习交流', icon: '', url: '' },
      { id: 12, name: '校园资讯', icon: '', url: '' },
      { id: 13, name: '运动打卡', icon: '', url: '' },
      { id: 14, name: '美食推荐习交流', icon: '', url: '' },
      { id: 15, name: '租房信息', icon: '', url: '' },
      { id: 16, name: '考研考习交流公', icon: '', url: '' },
      { id: 17, name: '技能分享', icon: '', url: '' }
    ],
    // 热榜
    hotList: [
      { id: 1, title: '今天的食堂新出了什么菜品，大家快来看看' },
      { id: 2, title: '期末考试复习资料分享，需要的同学来领取' },
      { id: 3, title: '校园歌手大赛报名开始了，有才艺的同学别错过' },
      { id: 4, title: '图书馆自习室预约攻略，期末必看' },
      { id: 5, title: '校园跑步打卡活动开始啦，一起运动吧' }
    ],
    // 公告信息（显示前50字，蓝色标签+蓝色下划线）
    noticeInfo: {
      id: 1,
      type: 'notice',
      content: '欢迎使用递明校园，这是一个专属于大学生的社交生活服务平台，在这里你可以发现更多精彩内容',
      url: '/pages/notice/detail?id=1'
    },
    // 活动信息（显示前50字）
    activityInfo: {
      id: 2,
      type: 'activity',
      content: '校园歌手大赛正在火热报名中，快来展示你的才艺吧，丰厚奖品等你来拿',
      url: '/pages/activity/detail?id=2'
    },
    // 推荐信息（标签可自定义，显示前50字）
    recommendInfo: {
      id: 3,
      type: 'recommend',
      tag: '推荐',  // 可自定义标签，如：热门、精选、新人福利等
      content: '新用户专享：首次发布帖子可获得积分奖励，快来参与吧',
      url: '/pages/recommend/detail?id=3'
    },
    // 内容分类
    tabList: ['最新', '树洞', '失物招领', '投票', '恋爱', '互助群']
  }

  successResponse(res, data)
}

module.exports = {
  getData
}
