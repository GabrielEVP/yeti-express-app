import dayjs from "dayjs";

export function filterByDateMonth<T>(items: T[], getDate: (item: T) => string | Date, month: dayjs.Dayjs): T[] {
   return items.filter((item) => dayjs(getDate(item)).isSame(month, "month"));
}
