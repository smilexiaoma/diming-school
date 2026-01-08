const { successResponse } = require('../utils/response')

const INFO_BY_TAB = {
  '最新': {
    noticeInfo: {
      id: 1,
      type: 'notice',
      content: '欢迎使用递明校园，这是一个专属于大学生的社交生活服务平台，在这里你可以发现更多精彩内容',
      url: '/pages/notice/detail?id=1'
    },
    activityInfo: {
      id: 2,
      type: 'activity',
      content: '校园歌手大赛正在火热报名中，快来展示你的才艺吧，丰厚奖品等你来拿',
      url: '/pages/activity/detail?id=2'
    },
    recommendInfo: {
      id: 3,
      type: 'recommend',
      tag: '推荐',
      content: '新用户专享：首次发布帖子可获得积分奖励，快来参与吧',
      url: '/pages/recommend/detail?id=3'
    }
  },
  '树洞': {
    noticeInfo: {
      id: 4,
      type: 'notice',
      content: '树洞功能升级啦，现在可以匿名分享你的心声和秘密，快来体验吧',
      url: '/pages/notice/detail?id=4'
    },
    activityInfo: {
      id: 5,
      type: 'activity',
      content: '树洞征文活动火热进行中，分享你的故事，赢取丰厚奖品',
      url: '/pages/activity/detail?id=5'
    },
    recommendInfo: {
      id: 6,
      type: 'recommend',
      tag: '精选',
      content: '树洞精选：本周热门话题汇总，快来看看大家都在讨论什么',
      url: '/pages/recommend/detail?id=6'
    }
  },
  '失物招领': {
    noticeInfo: {
      id: 7,
      type: 'notice',
      content: '失物招领平台上线啦，再也不用担心丢失物品找不到主人了',
      url: '/pages/notice/detail?id=7'
    },
    activityInfo: {
      id: 8,
      type: 'activity',
      content: '寻物成功奖励活动，帮助他人找到失物可获得积分奖励',
      url: '/pages/activity/detail?id=8'
    },
    recommendInfo: {
      id: 9,
      type: 'recommend',
      tag: '热门',
      content: '近期失物高频地点：图书馆、食堂、教学楼，请同学们注意保管',
      url: '/pages/recommend/detail?id=9'
    }
  },
  '投票': {
    noticeInfo: {
      id: 10,
      type: 'notice',
      content: '投票功能全面升级，支持多种投票类型，快来创建你的投票吧',
      url: '/pages/notice/detail?id=10'
    },
    activityInfo: {
      id: 11,
      type: 'activity',
      content: '热门投票活动：年度最受欢迎社团评选火热进行中',
      url: '/pages/activity/detail?id=11'
    },
    recommendInfo: {
      id: 12,
      type: 'recommend',
      tag: '参与',
      content: '参与投票赢积分，每天参与三次投票可获得额外奖励',
      url: '/pages/recommend/detail?id=12'
    }
  },
  '恋爱': {
    noticeInfo: {
      id: 13,
      type: 'notice',
      content: '表白墙全新上线，勇敢表达你的心意，也许Ta就在这里等你',
      url: '/pages/notice/detail?id=13'
    },
    activityInfo: {
      id: 14,
      type: 'activity',
      content: '520心动季活动火热进行中，表白成功可享情侣专属福利',
      url: '/pages/activity/detail?id=14'
    },
    recommendInfo: {
      id: 15,
      type: 'recommend',
      tag: '热门',
      content: '本月最佳情侣展示，快来学习表白技巧',
      url: '/pages/recommend/detail?id=15'
    }
  },
  '互助群': {
    noticeInfo: {
      id: 16,
      type: 'notice',
      content: '互助群功能上线，同学之间互相帮助，共同进步',
      url: '/pages/notice/detail?id=16'
    },
    activityInfo: {
      id: 17,
      type: 'activity',
      content: '互助之星评选活动，帮助他人最多的同学将获得荣誉证书和奖品',
      url: '/pages/activity/detail?id=17'
    },
    recommendInfo: {
      id: 18,
      type: 'recommend',
      tag: '推荐',
      content: '学霸互助群已成立，学习问题随时提问',
      url: '/pages/recommend/detail?id=18'
    }
  }
}

const getData = (req, res) => {
  const { tab } = req.query
  const info = INFO_BY_TAB[tab] || INFO_BY_TAB['最新']
  
  const data = {
    bannerList: [
      { id: 1, image: 'https://iph.href.lu/750x300?text=轮播图1', url: '' },
      { id: 2, image: 'https://iph.href.lu/750x300?text=轮播图2', url: '' },
      { id: 3, image: 'https://iph.href.lu/750x300?text=轮播图3', url: '' }
    ],
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
    hotList: [
      { id: 1, title: '今天的食堂新出了什么菜品，大家快来看看' },
      { id: 2, title: '期末考试复习资料分享，需要的同学来领取' },
      { id: 3, title: '校园歌手大赛报名开始了，有才艺的同学别错过' },
      { id: 4, title: '图书馆自习室预约攻略，期末必看' },
      { id: 5, title: '校园跑步打卡活动开始啦，一起运动吧' }
    ],
    noticeInfo: info.noticeInfo,
    activityInfo: info.activityInfo,
    recommendInfo: info.recommendInfo,
    tabList: ['最新', '树洞', '失物招领', '投票', '恋爱', '互助群']
  }

  successResponse(res, data)
}

module.exports = {
  getData
}
