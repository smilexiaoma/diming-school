<template>
  <div class="post-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>帖子管理</span>
        </div>
      </template>

      <el-form :inline="true" :model="queryParams" class="search-form">
        <el-form-item label="关键词">
          <el-input v-model="queryParams.keyword" placeholder="搜索标题/内容" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryParams.status" placeholder="全部" clearable>
            <el-option label="已发布" value="published" />
            <el-option label="待审核" value="pending" />
            <el-option label="已拒绝" value="rejected" />
          </el-select>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="queryParams.category" placeholder="全部" clearable>
            <el-option label="生活" value="生活" />
            <el-option label="学习" value="学习" />
            <el-option label="活动" value="活动" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="title" label="标题" min-width="200" />
        <el-table-column prop="author" label="作者" width="100" />
        <el-table-column prop="category" label="分类" width="80" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="statusType(row.status)">{{ statusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="views" label="浏览" width="80" />
        <el-table-column prop="likes" label="点赞" width="80" />
        <el-table-column prop="createdAt" label="发布时间" width="160" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="handleDetail(row)">详情</el-button>
            <el-button size="small" type="warning" @click="handleTop(row)">置顶</el-button>
            <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="queryParams.page"
        v-model:page-size="queryParams.pageSize"
        :total="total"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next"
        @size-change="fetchData"
        @current-change="fetchData"
        style="margin-top: 16px"
      />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { postApi } from '@/api'

const loading = ref(false)
const tableData = ref([])
const total = ref(0)
const queryParams = ref({ page: 1, pageSize: 10, keyword: '', status: '', category: '' })

const statusType = (status) => ({ published: 'success', pending: 'warning', rejected: 'danger' }[status] || 'info')
const statusText = (status) => ({ published: '已发布', pending: '待审核', rejected: '已拒绝' }[status] || status)

const fetchData = async () => {
  loading.value = true
  try {
    const res = await postApi.getList(queryParams.value)
    tableData.value = res.data.list
    total.value = res.data.total
  } finally {
    loading.value = false
  }
}

const handleSearch = () => { queryParams.value.page = 1; fetchData() }
const handleReset = () => { queryParams.value = { page: 1, pageSize: 10, keyword: '', status: '', category: '' }; fetchData() }
const handleDetail = (row) => ElMessage.info(`查看帖子详情: ${row.title}`)
const handleTop = async (row) => {
  await ElMessageBox.confirm('确定要置顶该帖子吗？', '提示')
  await postApi.setTop(row.id, { isTop: true })
  ElMessage.success('置顶成功')
}
const handleDelete = async (row) => {
  await ElMessageBox.confirm('确定要删除该帖子吗？', '警告', { type: 'warning' })
  await postApi.delete(row.id)
  ElMessage.success('删除成功')
  fetchData()
}

onMounted(fetchData)
</script>

<style scoped>
.search-form { margin-bottom: 16px; }
</style>
