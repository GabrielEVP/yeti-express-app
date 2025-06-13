import { TimeLineContent } from '@time-line-content/domain';

export interface Employee {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'basic';
  events: TimeLineContent[];
  createdAt: string;
  updatedAt: string;
}
