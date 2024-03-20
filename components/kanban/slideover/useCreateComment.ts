import { useMutation } from "@tanstack/vue-query";
import { COOLLECTION_COMMENTS, DB_ID } from "~/app.contants";
import { v4 as uuid } from "uuid";

export function useCreateComment({ refetch }: { refetch: () => void }) {
  const store = useDealSlideStore();
  const commentRef = ref<string>();
  const { mutate } = useMutation({
    mutationKey: ["add comment", commentRef.value],
    mutationFn: () =>
      DB.createDocument(DB_ID, COOLLECTION_COMMENTS, uuid(), {
        text: commentRef.value,
        deal: store.card?.id,
      }),
    onSuccess() {
      refetch();
      commentRef.value = "";
    },
  });

  const writeComment = () => {
    if (!commentRef.value) return;
    mutate();
  };

  return { commentRef, writeComment };
}
