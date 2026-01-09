<template>
  <div class="idle-list">
    <el-card>
      <template #header><span>闲置管理</span></template>
      <el-form :inline="true" :model="queryParams" class="search-form">
        <el-form-item label="关键词">
          <el-input v-model="queryParams.keyword" placeholder="搜索商品名" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryParams.status" placeholder="全部" clearable>
            <el-option label="在售" value="on_sale" />
            <el-option label="已售" value="sold" />
            <el-option label="已下架" value="off_shelf" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="title" label="商品名称" min-width="150" />
        <el-table-column prop="seller" label="卖家" width="100" />
        <el-table-column prop="price" label="售价" width="80">
          <template #default="{ row }">¥{{ row.price }}</template>
        </el-table-column>
        <el-table-column prop="category" label="分类" width="80" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="statusType(row.status)">{{ statusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="views" label="浏览" width="80" />
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
import { idleApi } from '@/api'

const loading = ref(false), tableData = ref([]), total = ref(0)
const queryParams = ref({ page: 1, pageSize: 10, keyword: '', status: '' })
const statusType = (s) => ({ on_sale: 'success', sold: 'info', off_shelf: 'warning' }[s] || 'info')
const statusText = (s) => ({ on_sale: '在售', sold: '已售', off_shelf: '已下架' }[s] || s)

const fetchData = async () => {
  loading.value = true
  try { const res = await idleApi.getList(queryParams.value); tableData.value = res.data.list; total.value = res.data.total } finally { loading.value = false }
}
const handleSearch = () => { queryParams.value.page = 1; fetchData() }
const handleReset = () => { queryParams.value = { page: 1, pageSize: 10, keyword: '', status: '' }; fetchData() }
const handleDetail = (row) => ElMessage.info(`查看商品详情: ${row.title}`)
const handleDelete = async (row) => { await ElMessageBox.confirm('确定删除？', '警告', { type: 'warning' }); await idleApi.delete(row.id); ElMessage.success('删除成功'); fetchData() }
onMounted(fetchData)
</script>
