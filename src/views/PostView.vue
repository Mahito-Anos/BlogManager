
<template>
  <div class="container-bg py-4">
    <div class="container">
      <h2 class="mb-4 text-center text-primary">✍️ Tạo bài viết</h2>

      <form @submit.prevent="createPost" class="bg-white p-4 rounded shadow-sm mb-5">
        <input v-model="title" class="form-control mb-2" placeholder="Tiêu đề bài viết" required />
        <input v-model="image" class="form-control mb-2" placeholder="URL ảnh minh họa (nếu có)" />
        <textarea v-model="content" class="form-control mb-3" placeholder="Nội dung bài viết" rows="5" required></textarea>
        <button class="btn btn-success w-100">Lưu bài viết</button>
      </form>

      <h4 class="mb-3 text-center text-primary">📚 Danh sách bài viết</h4>

      <div v-if="posts.length === 0" class="text-muted text-center">
        Chưa có bài viết nào.
      </div>

      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div class="col" v-for="post in posts" :key="post.id">
          <div class="card h-100 shadow-sm">
            <img v-if="post.image" :src="post.image" class="card-img-top" style="height: 160px; object-fit: cover;" />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title text-primary">{{ post.title }}</h5>
              <p class="card-text text-muted small" style="flex-grow: 1;">
                {{ post.content.slice(0, 100) }}...
              </p>
              <p class="text-end text-muted small">{{ post.createdAt }}</p>
              <div class="mt-auto text-end">
                <router-link :to="`/post/${post.id}`" class="btn btn-outline-primary btn-sm">Xem chi tiết</router-link>
                <button @click="deletePost(post.id)" class="btn btn-outline-danger btn-sm ms-2">Xoá</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const title = ref('')
const image = ref('')
const content = ref('')
const posts = ref([])

function loadPosts() {
  posts.value = []
  for (let key in localStorage) {
    if (key.startsWith('post-')) {
      const post = JSON.parse(localStorage.getItem(key))
      posts.value.push(post)
    }
  }

  // Sắp xếp theo thời gian mới nhất
  posts.value.sort((a, b) => b.id - a.id)
}

function createPost() {
  const id = Date.now()
  const newPost = {
    id,
    title: title.value,
    image: image.value || '/images/default.jpg',
    content: content.value,
    description: content.value.slice(0, 100) + '...',
    createdAt: new Date().toLocaleString()
  }

  localStorage.setItem(`post-${id}`, JSON.stringify(newPost))

  // Reset form
  title.value = ''
  image.value = ''
  content.value = ''

  loadPosts()
  alert('✅ Tạo bài viết thành công!')
}

function deletePost(id) {
  const confirmDelete = confirm('Bạn có chắc muốn xoá bài viết này?')
  if (confirmDelete) {
    localStorage.removeItem(`post-${id}`)
    loadPosts()
    alert('🗑️ Đã xoá bài viết.')
  }
}

onMounted(() => {
  loadPosts()
})
</script>
<style scoped>
.container-bg {
  background-color: #e6f7ff; /* Xanh nhạt */
  min-height: 100vh;
  padding-bottom: 40px;
}

.card {
  background-color: #ffffff;
  border-radius: 10px;
  transition: transform 0.2s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.15);
}

.card-title {
  font-weight: bold;
  font-size: 1.05rem;
}

.btn-outline-primary,
.btn-outline-danger {
  font-size: 0.85rem;
}

h2 {
  font-weight: bold;
  color: #007bff;
}

.form-control {
  background-color: #f8fbfd;
  border-color: #cce5ff;
}

</style>
