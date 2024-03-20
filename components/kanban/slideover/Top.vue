<script lang="ts" setup>
import dayjs from 'dayjs';


const dealStore = useDealSlideStore()

</script>

<template>
  <div class="border-border bg-black/20 rounded p-3">
    <div class="uppercase bold text-xl mb-4">About Deal</div>
    <KanbanSlideoverLabel label-text="Name">
      <h2>{{ dealStore.card?.name }}</h2>
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Price">
      {{ convertCurrency(dealStore.card?.price || 0) }}
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Status">
      <UiBadge variant="outline">{{ dealStore.card?.status }}</UiBadge>
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Client">
      {{ dealStore.card?.companyName }}
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Date of Creation">
      {{ dayjs(dealStore.card?.$createdAt).format('DD MMMM YYYY') }}
    </KanbanSlideoverLabel>
  </div>
</template>