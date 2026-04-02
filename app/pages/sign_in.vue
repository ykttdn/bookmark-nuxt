<script lang="ts" setup>
import { FetchError } from 'ofetch'

definePageMeta({
  middleware: 'visitor-only',
})

const formData = ref({
  email: '',
  password: '',
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    await $fetch('/api/sign_in', {
      method: 'POST',
      body: formData.value,
    })
    alert('Sign in successful!')

    const route = useRoute()
    const to = (route.query.redirect as string) || '/'
    await navigateTo(to)
  } catch (error) {
    if (error instanceof FetchError) {
      alert(`Sign in failed: ${error.data.errors.join('. ')}`)
    } else {
      alert('An unknown error occurred during sign in.')
      console.error(error)
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <h1>Sign in</h1>

  <form @submit.prevent="handleSubmit">
    <div>
      <label for="email">E-mail</label>
      <input
        id="email"
        v-model.trim="formData.email"
        type="email"
      >
    </div>

    <div>
      <label for="password">Password</label>
      <input
        id="password"
        v-model="formData.password"
        type="password"
        required
      >
    </div>

    <button
      type="submit"
      :disabled="isSubmitting"
      required
    >
      {{ isSubmitting ? 'Processing...' : 'Sign in' }}
    </button>
  </form>

  <p>
    Don't have an account?
    <NuxtLink to="/sign_up">
      Sign up
    </NuxtLink>
  </p>
</template>
