import { TimeLineContent } from '@time-line-content';

export interface Courier {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  events: TimeLineContent[];
  canDelete?: boolean;
  createdAt: string;
  updatedAt: string;
}
