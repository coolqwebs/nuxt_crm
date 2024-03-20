<script lang="ts" setup>
import { useMutation } from '@tanstack/vue-query';
import dayjs from 'dayjs';
import { COOLLECTION_DEALS, DB_ID } from '~/app.contants';
import { generateGradient } from '~/components/kanban/generateGradient';
import type { ICard, IColumn } from '~/components/kanban/kanban.types';
import { useKanbanQuery } from '~/components/kanban/useKanbanQuery';
import type { EnumStatus } from '~/types/deals.types';

type MoveDealArgs = {
  docId: string;
  status: EnumStatus
}
const { data, isLoading, refetch } = useKanbanQuery()

useSeoMeta({
  title: 'Home | CRM System',
})

const dragCardRef = ref<ICard | null>(null)
const sourceColumnRef = ref<IColumn | null>(null)
const dealStore = useDealSlideStore()


const { mutate } = useMutation({
  mutationKey: ['move deal', 'deals'],
  mutationFn: ({ docId, status }: MoveDealArgs) => {
    return DB.updateDocument(DB_ID, COOLLECTION_DEALS, docId, { status })
  },
  onSuccess() {
    refetch()
  }
})


function handleDragStart(card: ICard, column: IColumn) {
  dragCardRef.value = card
  sourceColumnRef.value = column
}

function handleDragOver(event: DragEvent) {
  event.preventDefault()
}

function handleDrop(targetColumn: IColumn) {
  if (dragCardRef.value && sourceColumnRef.value) {
    mutate({ docId: dragCardRef.value.id, status: targetColumn.id })
  }
}
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-2">CRM System by @coolqwebs</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else class="grid grid-cols-5 gap-10">
      <div v-for="(column, index) in data" :key="column.id" @dragover="handleDragOver" @drop="() => handleDrop(column)"
        class="min-h-screen">
        <div class="rounded bg-slate-500 py-1 px-5 mb-2 text-center" :style="generateGradient(index, data?.length)">{{
      column.name }}</div>
        <KanbanCreateDeal :refetch="refetch" :status="column.id" />
        <div>
          <UiCard v-for="card in column.items" :key="card.id" class="mb-3" draggable="true"
            @dragstart="() => handleDragStart(card, column)">
            <UiCardHeader role="button" @click="dealStore.set(card)">
              <UiCardTitle>{{ card.name }}</UiCardTitle>
              <UiCardDescription>{{ convertCurrency(card.price) }}</UiCardDescription>
            </UiCardHeader>
            <UiCardContent class="text-xs">Company:<br /> {{ card.companyName }}</UiCardContent>
            <UiCardFooter>{{ dayjs(card.$createdAt).format('DD MMMM YYYY') }}</UiCardFooter>
          </UiCard>
        </div>
      </div>
    </div>
    <KanbanSlideover />
  </div>
</template>