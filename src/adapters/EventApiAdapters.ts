import { Event } from "@/models/";

export function adaptEvents(apiEvent: any): Event {
   return {
      id: apiEvent.id,
      event: apiEvent.event,
      section: apiEvent.section,
      referenceTable: apiEvent.reference_table,
      referenceId: apiEvent.reference_id,
      createdAt: apiEvent.created_at,
   };
}

export function adaptEventsForApi(event: Event): any {
   return {
      id: event.id,
      event: event.event,
      section: event.section,
      reference_table: event.referenceTable,
      reference_id: event.referenceId,
      created_at: event.createdAt,
   };
}
