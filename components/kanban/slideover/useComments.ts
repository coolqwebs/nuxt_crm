import { useQuery } from "@tanstack/vue-query";
import { COOLLECTION_DEALS, DB_ID } from "~/app.contants";

export function useComments() {
  const store = useDealSlideStore();
  const cardId = store.card?.id || "";

  return useQuery({
    queryKey: ["deal", cardId],
    queryFn: () => DB.getDocument(DB_ID, COOLLECTION_DEALS, cardId),
  });
}
