<template>
  <div class="container-bg py-4">
    <div class="container profile-page" v-if="user">
      <h2 class="text-center text-primary mb-4">👤 Trang cá nhân</h2>

      <div class="p-4 bg-white rounded shadow">
        <div class="d-flex align-items-center mb-4 gap-4 flex-column flex-md-row text-center text-md-start">
          <img
            :src="user.avatar || defaultAvatar"
            class="avatar-preview"
            alt="Avatar"
          />
          <div>
            <h5 class="fw-bold mb-1">{{ user.name }}</h5>
            <p class="text-muted mb-1">{{ user.email }}</p>
            <p class="fst-italic mb-0">{{ user.bio || 'Chưa có giới thiệu bản thân.' }}</p>
          </div>
        </div>

        <form @submit.prevent="saveProfile">
          <div class="mb-3">
            <label class="form-label">Tên người dùng</label>
            <input v-model="user.name" class="form-control" />
          </div>

          <div class="mb-3">
            <label class="form-label">Email</label>
            <input v-model="user.email" class="form-control" disabled />
          </div>

          <div class="mb-3">
            <label class="form-label">Ảnh đại diện (URL)</label>
            <input v-model="user.avatar" class="form-control" placeholder="https://..." />
          </div>

          <div class="mb-3">
            <label class="form-label">Giới thiệu bản thân</label>
            <textarea v-model="user.bio" class="form-control" rows="3" placeholder="Một vài dòng về bạn..."></textarea>
          </div>

          <button class="btn btn-success w-100">💾 Lưu thay đổi</button>
        </form>
      </div>
    </div>

    <div v-else class="text-center text-danger mt-5">
      <p>⚠️ Vui lòng đăng nhập để xem trang cá nhân.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const user = ref(null)
const defaultAvatar = '/images/default-avatar.png'

onMounted(() => {
  const saved = localStorage.getItem('currentUser')
  if (saved) {
    user.value = JSON.parse(saved)
  }
})

function saveProfile() {
  localStorage.setItem('currentUser', JSON.stringify(user.value))
  window.dispatchEvent(new Event('user-updated'))
  alert('✅ Đã cập nhật thông tin cá nhân!')
}

</script>
<style scoped>
.container-bg {
  background-color: #e6f7ff;
  min-height: 100vh;
  padding-bottom: 40px;
}

.profile-page {
  max-width: 720px;
  margin: auto;
}

.avatar-preview {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 10px;
  border: 3px solid #cde4f7;
}

form .form-control {
  background-color: #f8fbfd;
  border-color: #cce5ff;
  transition: box-shadow 0.2s;
}

form .form-control:focus {
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.25);
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}
</style>