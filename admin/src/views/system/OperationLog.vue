<template>
  <div class="log-list">
    <el-card>
      <template #header><span>操作日志</span></template>
      <el-form :inline="true" :model="queryParams">
        <el-form-item label="管理员">
          <el-input v-model="queryParams.admin" placeholder="搜索管理员" clearable />
        </el-form-item>
        <el-form-item label="操作">
          <el-input v-model="queryParams.action" placeholder="搜索操作" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="admin" label="管理员" width="120" />
        <el-table-column prop="action" label="操作内容" min-width="200" />
        <el-table-column prop="ip" label="IP地址" width="130" />
        <el-table-column prop="createdAt" label="操作时间" width="160" />
      </el-table>
      <el-pagination v-model:current-page="queryParams.page" :total="total" layout="total, prev, pager, next" @change="fetchData" style="margin-top: 16px" />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { logApi } from '@/api'

const loading = ref(false)
const tableData = ref([])
const total = ref(0)
const queryParams = ref({ page: 1, admin: '', action: '' })

const fetchData = async () => {
  loading.value = true
  try {
    const res = await logApi.getList(queryParams.value)
    tableData.value = res.data.list
    total.value = res.data.total
  } finally { loading.value = false }
}

const handleSearch = () => { queryParams.value.page = 1; fetchData() }

onMounted(fetchData)
</script>
