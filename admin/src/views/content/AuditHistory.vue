<template>
  <div class="audit-history">
    <el-card>
      <template #header><span>审核历史</span></template>
      <el-form :inline="true" :model="queryParams">
        <el-form-item label="操作人">
          <el-input v-model="queryParams.operator" placeholder="搜索" clearable />
        </el-form-item>
        <el-form-item label="操作">
          <el-select v-model="queryParams.action" placeholder="全部" clearable>
            <el-option label="通过" value="approve" />
            <el-option label="拒绝" value="reject" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchData">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="contentTitle" label="内容标题" min-width="150" />
        <el-table-column prop="contentType" label="类型" width="80">
          <template #default="{ row }">{{ typeText[row.contentType] }}</template>
        </el-table-column>
        <el-table-column prop="action" label="操作" width="80">
          <template #default="{ row }">
            <el-tag :type="row.action === 'approve' ? 'success' : 'danger'">
              {{ row.action === 'approve' ? '通过' : '拒绝' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="reason" label="原因" width="150" />
        <el-table-column prop="operator" label="操作人" width="100" />
        <el-table-column prop="createdAt" label="时间" width="160" />
      </el-table>
      <el-pagination v-model:current-page="queryParams.page" :total="total" layout="total, prev, pager, next" @change="fetchData" style="margin-top: 16px" />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { contentApi } from '@/api'

const loading = ref(false), tableData = ref([]), total = ref(0)
const queryParams = ref({ page: 1, operator: '', action: '' })
const typeText = { post: '帖子', vote: '投票', idle: '闲置' }

const fetchData = async () => {
  loading.value = true
  try {
    const res = await contentApi.getAuditHistory(queryParams.value)
    tableData.value = res.data.list
    total.value = res.data.total
  } finally { loading.value = false }
}

onMounted(fetchData)
</script>
