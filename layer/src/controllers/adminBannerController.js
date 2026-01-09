const { successResponse, errorResponse } = require('../utils/response')

const mockBanners = [
  { id: 1, title: '新功能上线', image: '/banner1.jpg', link: '/activity/1', position: 'home', sort: 1, status: 'active', createdAt: '2024-01-15' },
  { id: 2, title: '跑腿活动', image: '/banner2.jpg', link: '/errand', position: 'errand', sort: 1, status: 'active', createdAt: '2024-01-14' }
]

exports.getList = async (req, res) => {
  try {
    const { position } = req.query
    let list = [...mockBanners]
    if (position) list = list.filter(item => item.position === position)
    successResponse(res, { list, total: list.length })
  } catch (error) { errorResponse(res, error.message) }
}

exports.add = async (req, res) => {
  try { successResponse(res, { id: Date.now() }, '添加成功') }
  catch (error) { errorResponse(res, error.message) }
}

exports.update = async (req, res) => {
  try { successResponse(res, null, '更新成功') }
  catch (error) { errorResponse(res, error.message) }
}

exports.delete = async (req, res) => {
  try { successResponse(res, null, '删除成功') }
  catch (error) { errorResponse(res, error.message) }
}
