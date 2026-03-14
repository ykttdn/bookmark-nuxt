<script setup lang="ts">
type User = {
  user: {
    email: string
  }
}

const { data } = await useFetch<User>('/api/users/me', {
  onResponseError({ response, error }) {
    console.error(error)

    if (response.status === 401) {
      console.log('Unauthorized')
    }
  },
})

const sign_out = async () => {
  try {
    await $fetch('/api/sign_out', {
      method: 'DELETE',
    })
    alert('Sign out successful!')
    await navigateTo('/sign_in')
  } catch {
    alert('An error occurred during sign out.')
  }
}
</script>

<template>
  <h1>root</h1>
  <p v-if="data">
    Welcome, {{ data.user.email }}!
  </p>
  <button @click="sign_out">
    Sign Out
  </button>
</template>
