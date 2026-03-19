<script lang="ts" setup>
import { FetchError } from 'ofetch'

definePageMeta({
  middleware: 'visitor-only',
})

const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const errors = ref<Record<string, string>>({})
const isSubmitting = ref(false)

const validateForm = () => {
  errors.value = {}

  if (!formData.value.name.trim()) {
    errors.value.name = 'Input your name'
  }

  if (!formData.value.email.trim()) {
    errors.value.email = 'Input your email'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    errors.value.email = 'Input a valid email address'
  }

  if (!formData.value.password) {
    errors.value.password = 'Input your password'
  } else if (formData.value.password.length < 6) {
    errors.value.password = 'Password must be at least 6 characters long'
  }

  if (formData.value.password !== formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Passwords do not match'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  try {
    await $fetch('/api/sign_up', {
      method: 'POST',
      body: formData.value,
    })
    alert('Sign up successful!')
    await navigateTo('/')
  } catch (error) {
    if (error instanceof FetchError) {
      alert(`Sign up failed: ${error.data.errors.join('. ')}`)
    } else {
      alert('An unknown error occurred during sign up.')
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="signup-container">
    <div class="signup-card">
      <h1>Sign up</h1>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            id="name"
            v-model.trim="formData.name"
            type="text"
            placeholder="Yamada Taro"
            class="form-input"
            :class="{ 'input-error': errors.name }"
          >
          <p
            v-if="errors.name"
            class="error-message"
          >
            {{ errors.name }}
          </p>
        </div>

        <div class="form-group">
          <label for="email">E-mail</label>
          <input
            id="email"
            v-model.trim="formData.email"
            type="email"
            placeholder="example@example.com"
            class="form-input"
            :class="{ 'input-error': errors.email }"
          >
          <p
            v-if="errors.email"
            class="error-message"
          >
            {{ errors.email }}
          </p>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            placeholder="6 characters minimum"
            class="form-input"
            :class="{ 'input-error': errors.password }"
          >
          <p
            v-if="errors.password"
            class="error-message"
          >
            {{ errors.password }}
          </p>
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            v-model="formData.confirmPassword"
            type="password"
            placeholder="Confirm your password"
            class="form-input"
            :class="{ 'input-error': errors.confirmPassword }"
          >
          <p
            v-if="errors.confirmPassword"
            class="error-message"
          >
            {{ errors.confirmPassword }}
          </p>
        </div>

        <button
          type="submit"
          class="submit-button"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Processing...' : 'Sign up' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.signup-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  padding: 40px;
  width: 100%;
  max-width: 400px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 28px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
  font-size: 14px;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input.input-error {
  border-color: #e74c3c;
}

.error-message {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 0;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-top: 10px;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-link {
  text-align: center;
  margin-top: 20px;
  color: #666;
  font-size: 14px;
}

.login-link a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
