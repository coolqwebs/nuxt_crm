interface ILoaderStore {
  loading: boolean;
}

const defaultValue: ILoaderStore = {
  loading: false,
};

export const useLoaderStore = defineStore("loader", {
  state: () => defaultValue,
  getters: {
    isLoading: (state) => state.loading,
  },
  actions: {
    set(payload: boolean) {
      this.$patch({ loading: payload });
    },
  },
});
