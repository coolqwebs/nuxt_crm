import type { ICard } from "~/components/kanban/kanban.types";

interface IDealSlideStore {
  card: ICard | null;
  isOpen: boolean;
}

const defaultValue: IDealSlideStore = {
  card: null,
  isOpen: false,
};

export const useDealSlideStore = defineStore("dealSlide", {
  state: () => defaultValue,
  getters: {},
  actions: {
    clear() {
      this.$patch(defaultValue);
    },
    set(card: ICard) {
      this.$patch({ card, isOpen: true });
    },
    toggle() {},
  },
});
