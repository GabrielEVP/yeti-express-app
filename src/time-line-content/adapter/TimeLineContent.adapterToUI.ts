import { formatDate } from '@/utils';
import type { TimeLineContent, UITimeLineContent, UITimeLineContentDefinitionMap } from '@/time-line-content/domain';
import { Info } from 'lucide-vue-next';

export function adaptTimeLineContentToUI(events: TimeLineContent[], definitions: UITimeLineContentDefinitionMap): UITimeLineContent[] {
  if (!events || events.length === 0) return [];

  return events.map((event) => {
    const def = definitions[event.getEvent()];

    return {
      date: formatDate(event.getCreatedAt()),
      icon: def?.icon ?? Info,
      title: def?.title ?? 'Título no disponible',
      text: def?.text ?? 'Texto no disponible',
    };
  });
}
