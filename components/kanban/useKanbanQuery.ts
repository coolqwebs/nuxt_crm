import { useQuery } from "@tanstack/vue-query";
import { COOLLECTION_DEALS, DB_ID } from "~/app.contants";
import { KANBAN_DATA } from "./kanban.data";
import type { ICard } from "./kanban.types";
import type { IDeal } from "~/types/deals.types";

export function useKanbanQuery() {
  return useQuery({
    queryKey: ["deals"],
    queryFn: () => {
      return DB.listDocuments(DB_ID, COOLLECTION_DEALS);
    },
    select(data) {
      const newBoard = KANBAN_DATA.map((col) => ({
        ...col,
        items: [] as IDeal[],
      }));
      const deals = data.documents as unknown as IDeal[];

      for (const deal of deals) {
        const column = newBoard.find((col) => col.id === deal.status);
        if (column) {
          column.items.push({
            $createdAt: deal.$createdAt,
            id: deal.$id,
            name: deal.name,
            price: deal.price,
            companyName: deal.customer.name,
            status: column.name,
          });
        }
      }

      return newBoard;
    },
  });
}
