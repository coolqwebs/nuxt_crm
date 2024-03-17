<script lang="ts" setup>
import { useMutation } from '@tanstack/vue-query';
import { COOLLECTION_DEALS, DB_ID } from '~/app.contants';
import type { IDeal } from '~/types/deals.types';
import { v4 as uuid } from 'uuid'

const isOpenForm = ref(false)

interface CreateDealFormState extends Pick<IDeal, 'name' | 'price'> {
  customer: {
    email: string;
    name: string;
  }
  status: string;
}

const props = withDefaults(defineProps<{ status: string; refetch: () => void }>(), {
  status: '',
})

const { handleSubmit, defineField, handleReset } = useForm<CreateDealFormState>({
  initialValues: {
    status: props.status
  }
})

const [name, nameAttrs] = defineField('name')
const [price, priceAttrs] = defineField('price')
const [customerName, customerNameAttrs] = defineField('customer.name')
const [customerEmail, customerEmailAttrs] = defineField('customer.email')

const { mutate, isPending } = useMutation({
  mutationKey: ['create a new deal', 'deals'],
  mutationFn: (data: CreateDealFormState) => {
    return DB.createDocument(DB_ID, COOLLECTION_DEALS, uuid(), data)
  },
  onSuccess(data) {
    props.refetch && props.refetch()
    handleReset()
  }
})

const onSubmit = handleSubmit((values) => {
  mutate(values)
})
</script>

<template>
  <div class="text-center mb-2">
    <button class="transition-all opacity-15 hover:opacity-100 hover:text-[#a252c8]" @click="isOpenForm = !isOpenForm">
      <Icon v-if="isOpenForm" class="fade-in-100 fade-out-0" name="radix-icons:arrow-up" size="25" />
      <Icon v-else class="fade-in-100 fade-out-0" name="radix-icons:plus-circled" size="25" />
    </button>
    <form v-if="isOpenForm" @submit.prevent="onSubmit" class="mb-3 block form">
      <UiInput placeholder="Name" v-model="name" v-bind="nameAttrs" type="text"
        class="border-[#161c26] mb-2 placeholder-[#748092] focus:border-border transition-colors" />
      <UiInput placeholder="Price" v-model="price" v-bind="priceAttrs" type="text"
        class="border-[#161c26] mb-2 placeholder-[#748092] focus:border-border transition-colors" />
      <UiInput placeholder="Email" v-model="customerEmail" v-bind="customerEmailAttrs" type="text"
        class="border-[#161c26] mb-2 placeholder-[#748092] focus:border-border transition-colors" />
      <UiInput placeholder="Company" v-model="customerName" v-bind="customerNameAttrs" type="text"
        class="border-[#161c26] mb-2 placeholder-[#748092] focus:border-border transition-colors" />
      <UiButton
        class="text-xs border py-1 px-2 rounded border-[#161c26] hover:border-[#482c65] transition-colors text-[#aebed5] hover:text-white"
        :disabled="isPending">
        {{ isPending ? 'Loading...' : 'Create' }}
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
