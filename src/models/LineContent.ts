import { FunctionalComponent } from "vue";
import { LucideProps } from "lucide-vue-next";

export interface TimeLineContent {
   date: string;
   icon: FunctionalComponent<LucideProps>;
   title: string;
   text: string;
}
