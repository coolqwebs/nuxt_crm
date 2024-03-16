<script lang="ts" setup>
import { useAuthStore } from '~/store/auth.store';
import { useLoaderStore } from '~/store/loader.store';

useSeoMeta({
  title: 'Login | CRM System',
})
const isLoadingStore = useLoaderStore()
const authStore = useAuthStore()
const router = useRouter()

const emailRef = ref('')
const passwordRef = ref('')

const login = async () => {
  isLoadingStore.set(true)
  await account.createEmailPasswordSession(emailRef.value, passwordRef.value)
  const res = await account.get()
  if (res) {
    authStore.set({ name: res.name, email: res.email, status: res.status })
  }

  emailRef.value = ''
  passwordRef.value = ''
  await router.push('/')
  isLoadingStore.set(false)
}

</script>

<template>
  <div class="flex items-center justify-center min-h-screen w-full">
    <div class="rounded-md bg-sidebar w-1/4 p-5">
      <h1 class="font-bold text-2xl text-center mb-5">Login</h1>

      <form class="flex flex-col gap-5" @submit.prevent="login">
        <UiInput placeholder="Email" type="email" v-model="emailRef" />
        <UiInput placeholder="Password" type="password" v-model="passwordRef" />
        <UiButton class="w-1/2 mx-auto">Login</UiButton>
      </form>
      <p class="text-xs text-center mt-10 mb-3">Don't have an account? <NuxtLink class="underline" to="/register">
          Register
        </NuxtLink>
      </p>
    </div>
  </div>
</template>