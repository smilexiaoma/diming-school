<template>
  <div class="auction-list">
    <el-card>
      <template #header><span>拍卖管理</span></template>
      <el-form :inline="true" :model="queryParams" class="search-form">
        <el-form-item label="关键词">
          <el-input v-model="queryParams.keyword" placeholder="搜索标题" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryParams.status" placeholder="全部" clearable>
            <el-option label="竞拍中" value="bidding" />
            <el-option label="已完成" value="completed" />
            <el-option label="待审核" value="pending" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="title" label="标题" min-width="150" />
        <el-table-column prop="publisher" label="发布者" width="100" />
        <el-table-column prop="startPrice" label="起拍价" width="80">
          <template #default="{ row }">¥{{ row.startPrice }}</template>
        </el-table-column>
        <el-table-column prop="currentPrice" label="当前价" width="80">
          <template #default="{ row }">¥{{ row.currentPrice }}</template>
        </el-table-column>
        <el-table-column prop="bids" label="出价次数" width="90" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="statusType(row.status)">{{ statusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="截止时间" width="160" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="handleDetail(row)">详情</el-button>
            <el-button size="small" type="warning" @click="handleEnd(row)" :disabled="row.status !== 'bidding'">结束</el-button>
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
import { auctionApi } from '@/api'

const loading = ref(false), tableData = ref([]), total = ref(0)
const queryParams = ref({ page: 1, pageSize: 10, keyword: '', status: '' })
const statusType = (s) => ({ bidding: 'success', completed: 'info', pending: 'warning' }[s] || 'info')
const statusText = (s) => ({ bidding: '竞拍中', completed: '已完成', pending: '待审核' }[s] || s)

const fetchData = async () => {
  loading.value = true
  try { const res = await auctionApi.getList(queryParams.value); tableData.value = res.data.list; total.value = res.data.total } finally { loading.value = false }
}
const handleSearch = () => { queryParams.value.page = 1; fetchData() }
const handleReset = () => { queryParams.value = { page: 1, pageSize: 10, keyword: '', status: '' }; fetchData() }
const handleDetail = (row) => ElMessage.info(`查看拍卖详情: ${row.title}`)
const handleEnd = async (row) => { await ElMessageBox.confirm('确定结束该拍卖？'); await auctionApi.end(row.id); ElMessage.success('已结束'); fetchData() }
const handleDelete = async (row) => { await ElMessageBox.confirm('确定删除？', '警告', { type: 'warning' }); await auctionApi.delete(row.id); ElMessage.success('删除成功'); fetchData() }
onMounted(fetchData)
</script>
