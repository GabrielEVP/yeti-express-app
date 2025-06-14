import { TimeLineContent } from '@/time-line-content';

export function adaptTimeLineContent(apiEvent: any): TimeLineContent {
  return {
    id: apiEvent.id,
    event: apiEvent.event,
    referenceTable: apiEvent.reference_table,
    referenceId: apiEvent.reference_id,
    createdAt: new Date(apiEvent.created_at),
  };
}
