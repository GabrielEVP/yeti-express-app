import { TimeLineContent } from "@models/LineContent";
import { formatDate } from "@utils";
import { EVENT_TIME_LINE_CONTENT } from "@/constants/";

type EventLike = {
   section?: string;
   event: string;
   createdAt: string;
};

export function mapEventsToLineContent<T extends EventLike>(events: T[]): TimeLineContent[] {
   return events.map((event) => {
      const table = event.section || "clients";
      const definition = EVENT_TIME_LINE_CONTENT[table]?.[event.event];

      return {
         icon: definition?.icon ?? "Info",
         title: definition?.title ?? "Título no disponible",
         text: definition?.text ?? "Texto no disponible",
         date: formatDate(event.createdAt),
      };
   });
}
