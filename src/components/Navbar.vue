<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
    <div class="container">
      <!-- Logo -->
      <router-link to="/" class="navbar-brand fw-bold text-primary fs-4">
        <i class="bi bi-journal-text me-2"></i>Blog Manager
      </router-link>

      <!-- Toggle mobile -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-between" id="navbarMenu">
        <!-- Menu trái -->
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active">Trang chủ</router-link>
          </li>
          <li v-if="currentUser" class="nav-item">
            <router-link to="/post" class="nav-link" active-class="active">Bài Viết</router-link>
          </li>
          <li v-if="currentUser" class="nav-item">
            <router-link to="/profile" class="nav-link" active-class="active">Tài khoản</router-link>
          </li>
        </ul>

        <!-- Menu phải -->
        <ul class="navbar-nav align-items-center">
          <!-- Nếu chưa đăng nhập -->
          <template v-if="!currentUser">
            <li class="nav-item">
              <router-link to="/login" class="nav-link" active-class="active">Đăng nhập</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/register" class="nav-link" active-class="active">Đăng ký</router-link>
            </li>
          </template>

          <!-- Nếu đã đăng nhập -->
          <template v-else>
            <li class="nav-item d-flex align-items-center me-2">
              <img
                :src="currentUser.avatar || '/images/default-avatar.png'"
                alt="Avatar"
                class="user-avatar"
              />
              <span class="nav-link">👋 {{ currentUser.name }}</span>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link text-danger" @click.prevent="logout">Đăng xuất</a>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const currentUser = ref(null)
const router = useRouter()

onMounted(() => {
  loadUser()

  // Lắng nghe sự kiện cập nhật từ các trang khác
  window.addEventListener('user-updated', loadUser)
})

function loadUser() {
  const saved = localStorage.getItem('currentUser')
  if (saved) {
    try {
      currentUser.value = JSON.parse(saved)
    } catch (err) {
      console.error('Lỗi khi đọc currentUser:', err)
      localStorage.removeItem('currentUser')
    }
  }
}

function logout() {
  localStorage.removeItem('currentUser')
  router.push('/login')
  location.reload()
}
</script>

<style scoped>
.user-avatar {
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid #ccc;
  margin-right: 8px;
}
</style>
