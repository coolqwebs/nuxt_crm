<script lang="ts" setup>
import { useMutation, useQuery } from '@tanstack/vue-query';
import { COOLLECTION_CUSTOMERS, DB_ID, STORAGE_ID } from '~/app.contants';
import type { ICustomer } from '~/types/deals.types';
import { v4 as uuid } from 'uuid'

useSeoMeta({
  title: 'Edit Customer | CRM System',
})
interface InputFileEvent extends Event {
  target: HTMLInputElement
}
interface ICustomerFormState extends Pick<ICustomer, 'name' | 'email' | 'avatart' | 'from_source'> { }

const route = useRoute();
const customerId = route.params.id as string

const { handleSubmit, defineField, setFieldValue, setValues, values } = useForm<ICustomerFormState>()

const { data, isSuccess } = useQuery({
  queryKey: ['get customer', customerId],
  queryFn: () => DB.getDocument(DB_ID, COOLLECTION_CUSTOMERS, customerId)
})
watch(isSuccess, () => {
  const { name, email, avatart, from_source } = data.value as unknown as ICustomerFormState
  setValues({ name, email, avatart, from_source: from_source || '' })
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [fromSource, fromSourceAttrs] = defineField('from_source')

const { mutate, isPending } = useMutation({
  mutationKey: ['edit customer'],
  mutationFn: (data: ICustomerFormState) => DB.updateDocument(DB_ID, COOLLECTION_CUSTOMERS, customerId, data)
})

const { mutate: uploadImage, isPending: isUploadImagePenfding } = useMutation({
  mutationKey: ['uload image'],
  mutationFn: (file: File) => storage.createFile(STORAGE_ID, uuid(), file),
  onSuccess(data) {
    const res = storage.getFileDownload(STORAGE_ID, data.$id)
    setFieldValue('avatart', res.href)
  }
})

const onSubmit = handleSubmit(values => mutate(values))
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-4">Edit {{ (data as unknown as ICustomerFormState)?.name }}</h1>
    <form @submit.prevent="onSubmit" class="mb-3 block form">
      <UiInput placeholder="Name" v-model="name" v-bind="nameAttrs" type="text"
        class="border-[#161c26] mb-4 placeholder-[#748092] focus:border-border transition-colors" />
      <UiInput placeholder="Email" v-model="email" v-bind="emailAttrs" type="text"
        class="border-[#161c26] mb-4 placeholder-[#748092] focus:border-border transition-colors" />
      <UiInput placeholder="From Source" v-model="fromSource" v-bind="fromSourceAttrs" type="text"
        class="border-[#161c26] mb-4 placeholder-[#748092] focus:border-border transition-colors" />

      <img v-if="values.avatart || isUploadImagePenfding" :src="values.avatart" alt="" width="50" height="50"
        class="rounded-full my-2 object-contain" />

      <div
        class="grid w-full max-w-sm items-center gap-1.5 border-[#161c26] mb-2 placeholder-[#748092] focus:border-border transition-colors">
        <label>
          <div class="text-sm mb-2">Logo</div>
          <UiInput type="file"
            :onchange="(e: InputFileEvent) => e?.target?.files?.length && uploadImage(e.target.files[0])"
            :disabled="isUploadImagePenfding" />
        </label>
      </div>
      <UiButton class="mt-3" variant="secondary" :disabled="isPending">
        {{ isPending ? 'Loading...' : 'Save' }}
      </UiButton>
    </form>
  </div>
</template>

<style scoped>
.form {
  animation: show .3s ease-in-out
}

@keyframes show {
  from {
    @apply border-[#a252c83d];
    transform: translateY(-35px);
    opacity: 0.4;
  }

  90% {
    @apply border-[#a252c83d];
  }

  to {
    @apply border-transparent;
    transform: translateY(0);
    opacity: 1;
  }
}
</style>