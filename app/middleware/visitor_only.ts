export default defineNuxtRouteMiddleware(async () => {
  const { error } = await useFetch('/api/users/me')
  if (!error.value) {
    return navigateTo('/')
  }
})
