<template>
  <div class="comment-list">
    <el-card>
      <template #header><span>评论管理</span></template>
      <el-form :inline="true" :model="queryParams" class="search-form">
        <el-form-item label="关键词">
          <el-input v-model="queryParams.keyword" placeholder="搜索评论内容" clearable />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="queryParams.targetType" placeholder="全部" clearable>
            <el-option label="帖子" value="post" />
            <el-option label="投票" value="vote" />
            <el-option label="交友" value="love" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryParams.status" placeholder="全部" clearable>
            <el-option label="正常" value="normal" />
            <el-option label="已隐藏" value="hidden" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="content" label="评论内容" min-width="200" show-overflow-tooltip />
        <el-table-column prop="author" label="评论者" width="100" />
        <el-table-column prop="targetType" label="类型" width="80">
          <template #default="{ row }">{{ typeText(row.targetType) }}</template>
        </el-table-column>
        <el-table-column prop="targetTitle" label="所属内容" width="150" show-overflow-tooltip />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === 'normal' ? 'success' : 'info'">
              {{ row.status === 'normal' ? '正常' : '已隐藏' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="评论时间" width="160" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button v-if="row.status === 'normal'" size="small" type="warning" @click="handleHide(row)">隐藏</el-button>
            <el-button v-else size="small" type="success" @click="handleShow(row)">显示</el-button>
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
import { commentApi } from '@/api'

const loading = ref(false), tableData = ref([]), total = ref(0)
const queryParams = ref({ page: 1, pageSize: 10, keyword: '', targetType: '', status: '' })
const typeText = (t) => ({ post: '帖子', vote: '投票', love: '交友' }[t] || t)

const fetchData = async () => {
  loading.value = true
  try { const res = await commentApi.getList(queryParams.value); tableData.value = res.data.list; total.value = res.data.total } finally { loading.value = false }
}
const handleSearch = () => { queryParams.value.page = 1; fetchData() }
const handleReset = () => { queryParams.value = { page: 1, pageSize: 10, keyword: '', targetType: '', status: '' }; fetchData() }
const handleHide = async (row) => { await commentApi.hide(row.id); ElMessage.success('已隐藏'); fetchData() }
const handleShow = async (row) => { await commentApi.show(row.id); ElMessage.success('已显示'); fetchData() }
const handleDelete = async (row) => { await ElMessageBox.confirm('确定删除？', '警告', { type: 'warning' }); await commentApi.delete(row.id); ElMessage.success('删除成功'); fetchData() }
onMounted(fetchData)
</script>
