<script lang="ts" setup>
import { account } from '~/utils/appwrite'
const isLoadingStore = useLoaderStore()
const authStore = useAuthStore()
const router = useRouter()

onMounted(async () => {
  try {
    isLoadingStore.set(true)
    const user = await account.get()
    if (user) {
      authStore.set(user)
      // authStore.set({
      //   email: user.email,
      //   name: user.name,
      //   status: user.status
      // })
    }
  } catch (error) {
    await router.push('/login')
    isLoadingStore.set(false)
  } finally {
    isLoadingStore.set(false)
  }
})
</script>

<template>
  <layout-loader v-if="isLoadingStore.isLoading" />
  <section v-else :class="{ grid: authStore.isAuth }" style="min-height: 100svh;">
    <layout-sidebar v-if="authStore.isAuth" />
    <div>
      <slot />
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 6fr;
}
</style>