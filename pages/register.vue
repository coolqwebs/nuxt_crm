<script lang="ts" setup>
import { useLoaderStore } from '~/store/loader.store';
import { v4 as uuid } from "uuid";

useSeoMeta({
  title: 'Register | CRM System',
})
const isLoadingStore = useLoaderStore()
const router = useRouter()

const emailRef = ref('')
const passwordRef = ref('')
const nameRef = ref('')

const register = async () => {
  try {
    isLoadingStore.set(true)
    await account.create(uuid(), emailRef.value, nameRef.value, passwordRef.value)
    await router.push('/login')
  } catch (error) {
    isLoadingStore.set(false)
  } finally {
    emailRef.value = ''
    nameRef.value = ''
    passwordRef.value = ''
    isLoadingStore.set(false)
  }
}

</script>

<template>
  <div class="flex items-center justify-center min-h-screen w-full">
    <div class="rounded-md bg-sidebar w-1/4 p-5">
      <h1 class="font-bold text-2xl text-center mb-5">Register</h1>

      <form class="flex flex-col gap-5" @submit.prevent="register">
        <UiInput placeholder="Email" type="email" v-model="emailRef" />
        <UiInput placeholder="Name" type="text" v-model="nameRef" />
        <UiInput placeholder="Password" type="password" v-model="passwordRef" />
        <UiButton class="w-1/2 mx-auto">Register</UiButton>
      </form>
      <p class="text-xs text-center mt-10 mb-3">Already have an account? <NuxtLink class="underline" to="/login">
          Login
        </NuxtLink>
      </p>
    </div>
  </div>
</template>