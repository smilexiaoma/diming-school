const { successResponse, errorResponse } = require('../utils/response')

// 模拟群消息数据（支持多媒体消息）
let mockMessages = [
  {
    id: 1,
    nickname: '张三',
    avatar: 'https://iph.href.lu/100x100?text=张三',
    badge: '头衔',
    content: '谁帮我代写一下',
    images: [], // 图片数组
    time: '10:34'
  },
  {
    id: 2,
    nickname: '李四',
    avatar: 'https://iph.href.lu/100x100?text=李四',
    badge: '大佬',
    content: '我可以帮你，发张图看看要求',
    images: [],
    time: '10:35'
  },
  {
    id: 3,
    nickname: '王五',
    avatar: 'https://iph.href.lu/100x100?text=王五',
    badge: '新手',
    content: '这是作业要求',
    images: [
      'https://picsum.photos/400/300?random=1',
      'https://picsum.photos/400/300?random=2'
    ],
    time: '10:36'
  }
]

// 获取群消息
const getMessages = (req, res) => {
  const { page = 1, pageSize = 20 } = req.query
  successResponse(res, { list: mockMessages })
}

// 发送群消息
const sendMessage = (req, res) => {
  const { content, images = [] } = req.body

  if (!content && (!images || images.length === 0)) {
    return errorResponse(res, '消息内容和图片不能同时为空', 400)
  }

  const newMessage = {
    id: Date.now(),
    nickname: '我',
    avatar: 'https://iph.href.lu/100x100?text=我',
    badge: '会员',
    content: content || '',
    images: images || [],
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }

  // 将新消息添加到消息列表
  mockMessages.push(newMessage)

  successResponse(res, newMessage, '发送成功')
}

module.exports = {
  getMessages,
  sendMessage
}
