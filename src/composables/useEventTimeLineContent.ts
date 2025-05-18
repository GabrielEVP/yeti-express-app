import { TimeLineContent } from "@models/LineContent";
import { formatDate } from "@utils";
import { EVENTTIMELINECONTENT } from "@/constants/";

type EventLike = {
   refenceTable?: string;
   event: string;
   createdAt: string;
};

export function mapEventsToLineContent<T extends EventLike>(events: T[]): TimeLineContent[] {
   return events.map((event) => {
      const table = event.refenceTable || "client";
      const definition = EVENTTIMELINECONTENT[table]?.[event.event];

      return {
         icon: definition?.icon ?? "Info",
         title: definition?.title ?? "Título no disponible",
         text: definition?.text ?? "Texto no disponible",
         date: formatDate(event.createdAt),
      };
   });
}
