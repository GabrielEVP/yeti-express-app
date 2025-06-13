import { TimeLineContent } from '@/time-line-content/domain';

export function adaptTimeLineContent(apiEvent: any): TimeLineContent {
  return new TimeLineContent(apiEvent.id, apiEvent.event, apiEvent.reference_table, apiEvent.reference_id, apiEvent.created_at);
}
