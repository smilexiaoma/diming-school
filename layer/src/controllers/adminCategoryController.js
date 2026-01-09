const { successResponse, errorResponse } = require('../utils/response')

const mockCategories = [
  { id: 1, name: '生活', type: 'post', sort: 1, status: 'active' },
  { id: 2, name: '学习', type: 'post', sort: 2, status: 'active' },
  { id: 3, name: '数码', type: 'idle', sort: 1, status: 'active' }
]

exports.getList = async (req, res) => {
  try {
    const { type } = req.query
    let list = [...mockCategories]
    if (type) list = list.filter(item => item.type === type)
    successResponse(res, { list })
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
