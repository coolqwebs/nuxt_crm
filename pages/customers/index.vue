<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query';
import { COOLLECTION_CUSTOMERS, DB_ID } from '~/app.contants';
import type { ICustomer } from '~/types/deals.types';


useSeoMeta({
  title: 'Customers | CRM System',
})

const { data: customers, isLoading, isFetched } = useQuery({
  queryKey: ['customers'],
  queryFn: () => DB.listDocuments(DB_ID, COOLLECTION_CUSTOMERS)
})
// const customers = (data?.value?.documents as unknown as ICustomer[])
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-2">Our Customers</h1>
    <div v-if="isLoading && !isFetched">Loadind...</div>
    <UiTable v-else>
      <UiTableHeader>
        <UiTableRow>
          <UiTableHead class="w-[150px]">Avatar</UiTableHead>
          <UiTableHead class="w-[300px]">Name</UiTableHead>
          <UiTableHead class="w-[300px]">Email</UiTableHead>
          <UiTableHead>From Source</UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <UiTableBody>
        <UiTableRow v-for="customer in (customers?.documents as unknown as ICustomer[])" :key="customer.$id">
          <UiTableCell>
            <NuxtLink :href="`/customers/edit/${customer.$id}`">
              <NuxtImg :src="customer.avatart" :alt="customer.name" width="50" height="50" class="rounded-full" />
            </NuxtLink>
          </UiTableCell>
          <UiTableCell class="font-medium">
            {{ customer.name }}
          </UiTableCell>
          <UiTableCell>
            {{ customer.email }}
          </UiTableCell>
          <UiTableCell>
            {{ customer.from_source }}
          </UiTableCell>
        </UiTableRow>
      </UiTableBody>
    </UiTable>
  </div>
</template>