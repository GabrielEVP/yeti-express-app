import { type TimeLineContent } from '@models/LineContent';
import { CLIENT_EVENT_DEFINITIONS } from '@/views/clients/constants/Client.FormatedTimeLine';
import { DELIVERY_EVENT_DEFINITION } from '@/views/deliveries/constants/Delivery.FormatedTimeLine';
import { COURIER_EVENT_DEFINITION } from '@views/couriers/presentation/constants/Courier.FormatedTimeLine';

export const EVENT_TIME_LINE_CONTENT: Record<
  string,
  Record<string, Omit<TimeLineContent, 'date'>>
> = {
  ...CLIENT_EVENT_DEFINITIONS,
  ...DELIVERY_EVENT_DEFINITION,
  ...COURIER_EVENT_DEFINITION,
};
