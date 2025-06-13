import { TimeLineContent } from '@time-line-content/domain';

export interface Courier {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  events: TimeLineContent[];
  createdAt: string;
  updatedAt: string;
}
