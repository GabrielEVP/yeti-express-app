import type { FunctionalComponent } from 'vue';
import type { LucideProps } from 'lucide-vue-next';

export interface UITimeLineContent {
  date: string;
  icon: FunctionalComponent<LucideProps>;
  title: string;
  text: string;
}

export type UITimeLineContentDefinition = Omit<UITimeLineContent, 'date'>;
export type UITimeLineContentDefinitionMap = Record<string, UITimeLineContentDefinition>;
