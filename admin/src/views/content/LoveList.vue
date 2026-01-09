<template>
  <div class="love-list">
    <el-card>
      <template #header><span>交友管理</span></template>
      <el-form :inline="true" :model="queryParams" class="search-form">
        <el-form-item label="关键词">
          <el-input v-model="queryParams.keyword" placeholder="搜索昵称" clearable />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="queryParams.gender" placeholder="全部" clearable>
            <el-option label="男" value="male" />
            <el-option label="女" value="female" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryParams.status" placeholder="全部" clearable>
            <el-option label="已发布" value="published" />
            <el-option label="待审核" value="pending" />
            <el-option label="已拒绝" value="rejected" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="nickname" label="昵称" width="120" />
        <el-table-column prop="gender" label="性别" width="80">
          <template #default="{ row }">{{ row.gender === 'male' ? '男' : '女' }}</template>
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="intro" label="简介" min-width="150" show-overflow-tooltip />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="statusType(row.status)">{{ statusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="likes" label="喜欢" width="80" />
        <el-table-column prop="createdAt" label="发布时间" width="160" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="handleDetail(row)">详情</el-button>
            <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="queryParams.page" v-model:page-size="queryParams.pageSize" :total="total" layout="total, sizes, prev, pager, next" @change="fetchData" style="margin-top: 16px" />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { loveApi } from '@/api'

const loading = ref(false), tableData = ref([]), total = ref(0)
const queryParams = ref({ page: 1, pageSize: 10, keyword: '', gender: '', status: '' })
const statusType = (s) => ({ published: 'success', pending: 'warning', rejected: 'danger' }[s] || 'info')
const statusText = (s) => ({ published: '已发布', pending: '待审核', rejected: '已拒绝' }[s] || s)

const fetchData = async () => {
  loading.value = true
  try { const res = await loveApi.getList(queryParams.value); tableData.value = res.data.list; total.value = res.data.total } finally { loading.value = false }
}
const handleSearch = () => { queryParams.value.page = 1; fetchData() }
const handleReset = () => { queryParams.value = { page: 1, pageSize: 10, keyword: '', gender: '', status: '' }; fetchData() }
const handleDetail = (row) => ElMessage.info(`查看交友详情: ${row.nickname}`)
const handleDelete = async (row) => { await ElMessageBox.confirm('确定删除？', '警告', { type: 'warning' }); await loveApi.delete(row.id); ElMessage.success('删除成功'); fetchData() }
onMounted(fetchData)
</script>
