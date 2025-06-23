<template>
  <div class="d-flex align-items-center justify-content-center min-vh-100 bg-register px-3">
    <div class="card register-card shadow-lg animate__animated animate__fadeInDown">
      <div class="text-center mb-4">
        <i class="bi bi-person-plus-fill text-success" style="font-size: 3.5rem;"></i>
        <h2 class="fw-bold mt-2 text-success">Đăng ký tài khoản</h2>
        <p class="text-muted small">Tạo tài khoản để bắt đầu sử dụng hệ thống</p>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label class="form-label fw-semibold">Họ tên</label>
          <input v-model="name" type="text" class="form-control form-control-lg" placeholder="Họ và tên..." />
          <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
        </div>

        <div class="mb-3">
          <label class="form-label fw-semibold">Email</label>
          <input v-model="email" type="email" class="form-control form-control-lg" placeholder="Email..." />
          <small v-if="errors.email" class="text-danger">{{ errors.email }}</small>
        </div>

        <div class="mb-3">
          <label class="form-label fw-semibold">Mật khẩu</label>
          <input v-model="password" type="password" class="form-control form-control-lg" placeholder="Mật khẩu..." />
          <small v-if="errors.password" class="text-danger">{{ errors.password }}</small>
        </div>

        <button class="btn btn-success w-100 py-2 fs-5 fw-bold mt-2">🚀 Đăng ký</button>
      </form>

      <p class="mt-4 text-center text-muted small">
        Đã có tài khoản?
        <router-link to="/login" class="text-success text-decoration-none fw-semibold">Đăng nhập</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const errors = ref({})
const router = useRouter()

const handleSubmit = () => {
  errors.value = {}
  let isValid = true

  if (!name.value.trim()) {
    errors.value.name = 'Vui lòng nhập họ tên.'
    isValid = false
  }

  if (!email.value || !email.value.includes('@')) {
    errors.value.email = 'Email không hợp lệ.'
    isValid = false
  }

  if (!password.value || password.value.length < 6) {
    errors.value.password = 'Mật khẩu phải từ 6 ký tự.'
    isValid = false
  }

  if (!isValid) return

  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const exists = users.find(u => u.email === email.value.trim())

  if (exists) {
    errors.value.email = 'Email đã được sử dụng.'
    return
  }

  const newUser = {
    name: name.value.trim(),
    email: email.value.trim(),
    password: password.value
  }

  users.push(newUser)
  localStorage.setItem('users', JSON.stringify(users))

  alert('🎉 Đăng ký thành công! Mời bạn đăng nhập.')
  router.push('/login')
}
</script>

<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";

.bg-register {
  background: linear-gradient(to right, #e8fdf5, #d5f5e3);
}

.register-card {
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
  background-color: #157347;
}
</style>
