<template>
  <div class="container-bg py-5">
    <div class="container mt-4">
      <div v-if="post">
        <h2 class="mb-3 text-success text-center">{{ post.title }}</h2>
        <img v-if="post.image" :src="post.image" class="img-fluid mb-4 detail-img mx-auto d-block" />
        <p class="lead text-center">{{ post.description }}</p>
        <div class="content">{{ post.content }}</div>

        <!-- Bình luận -->
        <hr />
        <h5 class="text-primary mt-4">💬 Bình luận</h5>

        <div v-if="comments.length === 0" class="text-muted mb-3">Chưa có bình luận nào.</div>

        <div v-else class="mb-4">
          <div v-for="(cmt, index) in comments" :key="index" class="comment-box">
            <strong>{{ cmt.name }}</strong>
            <small class="text-muted">({{ cmt.time }})</small>
            <p class="mb-1">{{ cmt.text }}</p>
          </div>
        </div>

        <!-- Form gửi bình luận -->
        <form @submit.prevent="submitComment" class="mt-3">
          <input
            v-if="!currentUser"
            v-model="newComment.name"
            class="form-control mb-2"
            placeholder="Tên của bạn"
            required
          />
          <textarea
            v-model="newComment.text"
            class="form-control mb-2"
            placeholder="Nội dung bình luận"
            rows="3"
            required
          ></textarea>
          <button class="btn btn-success w-100">Gửi bình luận</button>
        </form>
      </div>

      <div v-else class="text-center text-danger mt-5">
        <p>❌ Bài viết không tồn tại hoặc đã bị xóa.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const post = ref(null)
const comments = ref([])
const newComment = ref({ name: '', text: '' })
const currentUser = ref(null)

onMounted(() => {
  const id = parseInt(route.params.id)
  const stored = localStorage.getItem(`post-${id}`)
  const user = localStorage.getItem('currentUser')

  if (user) {
    currentUser.value = JSON.parse(user)
    newComment.value.name = currentUser.value.name
  }

  if (stored) {
    post.value = JSON.parse(stored)
    if (!post.value.description && post.value.content)
      post.value.description = post.value.content.slice(0, 100) + '...'
  } else {
    post.value = null
  }

  const storedComments = localStorage.getItem(`comments-${id}`)
  if (storedComments) {
    comments.value = JSON.parse(storedComments)
  }
})

function submitComment() {
  if (!newComment.value.text || (!newComment.value.name && !currentUser.value)) return

  const now = new Date()
  const time = now.toLocaleString('vi-VN')

  comments.value.push({
    name: newComment.value.name,
    text: newComment.value.text,
    time
  })

  localStorage.setItem(`comments-${post.value.id}`, JSON.stringify(comments.value))
  newComment.value.text = ''
}
</script>

<style scoped>
.container-bg {
  background-color: #e6f7ff;
  min-height: 100vh;
}

.detail-img {
  max-height: 400px;
  object-fit: contain;
}

.content {
  font-size: 1.1rem;
  line-height: 1.75;
  padding: 0 10px;
  background-color: #ffffffb3;
  border-radius: 10px;
  padding: 1rem;
}

.comment-box {
  background: #ffffff;
  padding: 10px 15px;
  border-radius: 6px;
  margin-bottom: 10px;
  border-left: 4px solid #28a745;
}
</style>
