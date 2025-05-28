import { type TimeLineContent } from '@models/LineContent';
import { CLIENT_EVENT_DEFINITIONS } from '@views/clients/presentation/constants/FormatedTimeLine.Client';
import { COURIER_EVENT_DEFINITION } from '@views/couriers/presentation/constants/Courier.FormatedTimeLine';

export const EVENT_TIME_LINE_CONTENT: Record<
  string,
  Record<string, Omit<TimeLineContent, 'date'>>
> = {
  ...CLIENT_EVENT_DEFINITIONS,
  ...COURIER_EVENT_DEFINITION,
};
