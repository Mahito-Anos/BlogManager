<template>
  <div class="container-bg">
    <!-- Banner -->
    <div id="mainBanner" class="carousel slide carousel-fade mb-5" data-bs-ride="carousel" data-bs-interval="3000">
      <div class="carousel-inner rounded shadow">
        <div class="carousel-item active">
          <img src="/images/banner1.jpg" class="d-block w-100 banner-img" alt="Banner 1" />
        </div>
        <div class="carousel-item">
          <img src="/images/banner2.png" class="d-block w-100 banner-img" alt="Banner 2" />
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#mainBanner" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#mainBanner" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
      </button>
      

    </div>
<!-- Giới thiệu bản thân -->
<!-- Giới thiệu bản thân -->
<div class="container my-5">
  <h4 class="text-center text-info mb-4">👤 Giới thiệu bản thân</h4>

  <div v-if="user" class="p-4 bg-white rounded shadow d-flex flex-column flex-md-row align-items-center justify-content-center gap-4">
  <img
    :src="user.avatar || '/images/default-avatar.png'"
    alt="Avatar"
    class="avatar-home"
  />
  <div class="text-start">
    <p class="mb-1"><strong>Tên người dùng:</strong> {{ user.name }}</p>
    <p class="mb-1"><strong>Email:</strong> {{ user.email }}</p>
    <p class="mb-0"><strong>Giới thiệu:</strong> {{ user.bio || 'Chưa có giới thiệu.' }}</p>
  </div>
</div>
  <div v-else class="text-muted text-center mt-3">
    <p>Chưa có thông tin cá nhân.</p>
  </div>
</div>

    <!-- Bài viết mới nhất -->
    <div class="container mt-4">
      <h2 class="mb-4 text-center text-success">Bài viết mới nhất</h2>
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col" v-for="post in paginatedPosts" :key="post.id">
          <div class="card shadow-sm h-100">
            <img :src="post.image" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">{{ post.title }}</h5>
              <p class="card-text">{{ post.description }}</p>
              <router-link :to="`/post/${post.id}`" class="btn btn-outline-success btn-sm">Xem chi tiết</router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <nav class="mt-4 d-flex justify-content-center">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="currentPage--">«</button>
          </li>
          <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
            <button class="page-link" @click="currentPage = page">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="currentPage++">»</button>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Chuyên mục CNTT -->
    <div class="container my-5">
      <h2 class="mb-4 text-center text-primary">Chuyên mục Công nghệ thông tin</h2>
      <div class="row row-cols-1 row-cols-md-4 g-3">
        <div v-for="topic in topics" :key="topic.name" class="col">
          <div class="card border-0 shadow-sm h-100 text-center p-3 bg-light">
            <i :class="topic.icon" class="fs-1 text-success mb-2"></i>
            <h6 class="fw-bold">{{ topic.name }}</h6>
          </div>
        </div>
      </div>
    </div>
    <div class="container text-center my-5" v-if="!isLoggedIn">
      <h4 class="fw-bold">🌟 Tham gia cộng đồng chia sẻ kiến thức ngay hôm nay!</h4>
      <router-link to="/register" class="btn btn-success mt-3">Đăng ký miễn phí</router-link>
    </div>
    <!-- Sự kiện -->
    <div class="container my-5">
      <h4 class="text-center text-warning mb-3">📆 Sự kiện nổi bật</h4>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">🎓 Workshop: Frontend Vue.js cho người mới (20/06)</li>
        <li class="list-group-item">🧠 Thi Online: Đố vui IT toàn trường (22/06)</li>
        <li class="list-group-item">🚀 Đăng bài thi ASM: đến hạn ngày 25/06</li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'

const currentPage = ref(1)
const postsPerPage = 3
const posts = ref([])
const isLoggedIn = !!localStorage.getItem('currentUser')

function loadPosts() {
  posts.value = []
  for (let key in localStorage) {
    if (key.startsWith('post-')) {
      const post = JSON.parse(localStorage.getItem(key))
      posts.value.push(post)
    }
  }
  posts.value.sort((a, b) => b.id - a.id)
}

onMounted(() => {
  loadPosts()
})

const totalPages = computed(() => Math.ceil(posts.value.length / postsPerPage))
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  return posts.value.slice(start, start + postsPerPage)
})

const topics = [
  { name: 'Lập trình Web', icon: 'bi bi-code-slash' },
  { name: 'Trí tuệ nhân tạo', icon: 'bi bi-cpu' },
  { name: 'Cơ sở dữ liệu', icon: 'bi bi-hdd-network' },
  { name: 'Bảo mật', icon: 'bi bi-shield-lock' },
  { name: 'Mobile App', icon: 'bi bi-phone' },
  { name: 'UI/UX Design', icon: 'bi bi-easel2' },
  { name: 'DevOps', icon: 'bi bi-tools' },
  { name: 'Cloud Computing', icon: 'bi bi-cloud' }
]
const user = ref(null)

onMounted(() => {
  loadPosts()
  const storedUser = localStorage.getItem('currentUser')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
  }
})

</script>

<style scoped>
.container-bg {
  background-color: #e6f7ff;
  min-height: 100vh;
  padding-bottom: 50px;
}

.banner-img {
  height: 600px;
  object-fit: cover;
  border-radius: 10px;
}

.card i {
  transition: transform 0.3s ease;
}

.card:hover i {
  transform: scale(1.2);
}
</style>
