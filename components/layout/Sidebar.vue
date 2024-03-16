<script lang="ts" setup>
const isLoadingStore = useLoaderStore()
const authStore = useAuthStore()
const router = useRouter()
const logout = async () => {
  isLoadingStore.set(true)
  await account.deleteSession('current')
  authStore.clear()
  await router.push('/login')
  isLoadingStore.set(false)
}
</script>

<template>
  <aside class="px-5 py-8 bg-sidebar h-full w-full relative">
    <NuxtLink to="/" class="mb-10 block">
      <NuxtImg src="/logo.svg" alt="" width="140px" class="mx-auto mt-5" />
    </NuxtLink>
    <button class="absolute top-2 right-3 transition-colors hover:text-primary" @click="logout">
      <Icon name="line-md:logout" size="20" />
    </button>
    <LayoutMenu />
  </aside>
</template>