<template>
  <div class="d-flex align-items-center justify-content-center min-vh-100 bg-login px-3">
    <div class="card login-card shadow-lg animate__animated animate__fadeInUp">
      <div class="text-center mb-4">
        <i class="bi bi-shield-lock-fill text-success" style="font-size: 3.5rem;"></i>
        <h2 class="fw-bold text-success mt-2">Đăng Nhập</h2>
        <p class="text-muted mb-0">Chào mừng bạn quay lại Blog Manager 🎉</p>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label class="form-label fw-semibold">Email</label>
          <input v-model="email" type="email" class="form-control form-control-lg" placeholder="Nhập email..." />
          <small v-if="error.email" class="text-danger">{{ error.email }}</small>
        </div>

        <div class="mb-3">
          <label class="form-label fw-semibold">Mật khẩu</label>
          <input v-model="password" type="password" class="form-control form-control-lg" placeholder="Nhập mật khẩu..." />
          <small v-if="error.password" class="text-danger">{{ error.password }}</small>
        </div>

        <div v-if="error.general" class="alert alert-danger small py-2">
          {{ error.general }}
        </div>

        <button class="btn btn-success w-100 py-2 fs-5 fw-bold mt-2">🔓 Đăng nhập</button>
      </form>

      <p class="mt-4 text-center text-muted small">
        Bạn chưa có tài khoản?
        <router-link to="/register" class="text-success text-decoration-none fw-semibold">Đăng ký</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref({})
const router = useRouter()

const handleLogin = () => {
  error.value = {}

  if (!email.value) error.value.email = 'Vui lòng nhập email.'
  if (!password.value) error.value.password = 'Vui lòng nhập mật khẩu.'
  if (Object.keys(error.value).length > 0) return

  const users = JSON.parse(localStorage.getItem('users') || '[]')

  const matchedUser = users.find(
    user =>
      user.email.trim().toLowerCase() === email.value.trim().toLowerCase() &&
      user.password === password.value
  )

  if (matchedUser) {
    alert(`Đăng nhập thành công! Xin chào ${matchedUser.name}`)
    localStorage.setItem('currentUser', JSON.stringify(matchedUser))
    router.push('/')
  } else {
    error.value.general = 'Email hoặc mật khẩu không đúng!'
  }
}
</script>

<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";

.bg-login {
  background: linear-gradient(135deg, #d7f8e4, #f0fff4);
}

.login-card {
  width: 100%;
  max-width: 450px;
  padding: 2.5rem;
  border-radius: 20px;
  background-color: white;
}

input.form-control {
  border-radius: 12px;
  transition: all 0.2s ease;
}

input.form-control:focus {
  border-color: #198754;
  box-shadow: 0 0 0 0.15rem rgba(25, 135, 84, 0.25);
}

button.btn-success {
  border-radius: 12px;
  font-weight: 600;
}

button.btn-success:hover {
  background-color: #146c43;
}
</style>
