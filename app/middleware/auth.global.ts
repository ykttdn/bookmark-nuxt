export default defineNuxtRouteMiddleware(async (to, _from) => {
  if (to.path === '/sign_in') {
    return
  }

  const { error } = await useFetch('/api/users/me')
  if (error.value?.statusCode === 401) {
    return navigateTo({
      path: '/sign_in',
      query: { redirect: to.path },
    })
  }
})
