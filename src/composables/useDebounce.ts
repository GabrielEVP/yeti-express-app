import { ref } from 'vue';

export function useDebounce<T extends (...args: any[]) => any>(
    fn: T,
    delay: number
): (...args: Parameters<T>) => void {
    const timeout = ref<NodeJS.Timeout | null>(null);

    return (...args: Parameters<T>) => {
        if (timeout.value) {
            clearTimeout(timeout.value);
        }

        timeout.value = setTimeout(() => {
            fn(...args);
        }, delay);
    };
} 