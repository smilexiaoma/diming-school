<template>
  <div class="banner-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>轮播图管理</span>
          <el-button type="primary" @click="handleAdd">添加轮播图</el-button>
        </div>
      </template>
      <el-form :inline="true" :model="queryParams">
        <el-form-item label="位置">
          <el-select v-model="queryParams.position" placeholder="全部" clearable>
            <el-option label="首页" value="home" />
            <el-option label="跑腿" value="errand" />
            <el-option label="互助" value="help" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchData">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="title" label="标题" width="150" />
        <el-table-column prop="image" label="图片" width="120">
          <template #default="{ row }">
            <el-image :src="row.image" style="width: 80px; height: 40px" fit="cover" />
          </template>
        </el-table-column>
        <el-table-column prop="position" label="位置" width="80">
          <template #default="{ row }">{{ positionText(row.position) }}</template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="80" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'info'">
              {{ row.status === 'active' ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="{ row }">
            <el-button size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑轮播图' : '添加轮播图'" width="500px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="标题"><el-input v-model="form.title" /></el-form-item>
        <el-form-item label="图片"><el-input v-model="form.image" placeholder="图片URL" /></el-form-item>
        <el-form-item label="链接"><el-input v-model="form.link" /></el-form-item>
        <el-form-item label="位置">
          <el-select v-model="form.position">
            <el-option label="首页" value="home" />
            <el-option label="跑腿" value="errand" />
            <el-option label="互助" value="help" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序"><el-input-number v-model="form.sort" :min="1" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { bannerApi } from '@/api'

const loading = ref(false), tableData = ref([]), dialogVisible = ref(false), isEdit = ref(false), currentId = ref(null)
const queryParams = ref({ position: '' })
const form = reactive({ title: '', image: '', link: '', position: 'home', sort: 1 })
const positionText = (p) => ({ home: '首页', errand: '跑腿', help: '互助' }[p] || p)

const fetchData = async () => {
  loading.value = true
  try { const res = await bannerApi.getList(queryParams.value); tableData.value = res.data.list } finally { loading.value = false }
}
const handleAdd = () => { isEdit.value = false; Object.assign(form, { title: '', image: '', link: '', position: 'home', sort: 1 }); dialogVisible.value = true }
const handleEdit = (row) => { isEdit.value = true; currentId.value = row.id; Object.assign(form, row); dialogVisible.value = true }
const handleSubmit = async () => {
  if (isEdit.value) await bannerApi.update(currentId.value, form)
  else await bannerApi.add(form)
  ElMessage.success(isEdit.value ? '更新成功' : '添加成功'); dialogVisible.value = false; fetchData()
}
const handleDelete = async (row) => { await ElMessageBox.confirm('确定删除？'); await bannerApi.delete(row.id); ElMessage.success('删除成功'); fetchData() }
onMounted(fetchData)
</script>

<style scoped>
.card-header { display: flex; justify-content: space-between; align-items: center; }
</style>
