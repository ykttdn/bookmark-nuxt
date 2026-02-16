<script setup lang="ts">
type User = {
    user: {
        email: string
    }
}

const { data } =  await useFetch<User>('/api/users/me', {
    onResponseError({ response, error }) {
        console.error(error);

        if (response.status === 401) {
            console.log('Unauthorized');
        }
    }
})
</script>

<template>
    <h1>root</h1>
    <p v-if="data">Welcome, {{ data.user.email }}!</p>
</template>
