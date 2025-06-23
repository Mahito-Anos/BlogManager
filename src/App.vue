<template>
  <div>
    <!-- Ẩn Navbar nếu đang ở trang login hoặc register -->
    <Navbar v-if="showNavbar" />
    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'

// Lấy route hiện tại
const route = useRoute()

// Tính toán để hiển thị Navbar
const showNavbar = computed(() => {
  const hiddenRoutes = ['Login', 'Register']
  return !hiddenRoutes.includes(route.name)
})
</script>
