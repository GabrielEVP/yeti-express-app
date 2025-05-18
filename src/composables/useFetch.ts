import { ref } from "vue";
import { useAlert } from "@/composables/useAlert";

type FetchFunction<ResponseType, ParamsType = void> = ParamsType extends void ? () => Promise<ResponseType> : (params: ParamsType) => Promise<ResponseType>;

interface UseFetchOptions<ResponseType, ParamsType = void> {
   fetchFunction: FetchFunction<ResponseType, ParamsType>;
   errorMessageOnFailure?: string;
   defaultValueOnError?: ResponseType; // value to return if fetch fails
}

/**
 * Generic composable to handle async data fetching.
 * Manages loading, errors, and stores response data.
 * Returns defaultValueOnError if fetch fails to avoid nulls.
 */
export function useFetch<ResponseType, ParamsType = void>({
   fetchFunction,
   errorMessageOnFailure = "An error occurred while fetching data.",
   defaultValueOnError,
}: UseFetchOptions<ResponseType, ParamsType>) {
   const responseData = ref<ResponseType | null>(null);
   const isLoading = ref(false);
   const fetchError = ref<Error | null>(null);
   const { triggerError } = useAlert();

   /**
    * Executes the fetch function.
    * Supports optional parameters.
    * Returns fetched data or default value on error.
    */
   const executeFetch = async (params?: ParamsType): Promise<ResponseType> => {
      isLoading.value = true;
      fetchError.value = null;

      try {
         const result = params === undefined ? (fetchFunction as () => Promise<ResponseType>)() : (fetchFunction as (params: ParamsType) => Promise<ResponseType>)(params);

         responseData.value = await result;
         return responseData.value;
      } catch (error) {
         const formattedError = error instanceof Error ? error : new Error(String(error));
         fetchError.value = formattedError;
         triggerError(errorMessageOnFailure);

         // Return default value or null casted to ResponseType
         return defaultValueOnError !== undefined ? defaultValueOnError : (null as unknown as ResponseType);
      } finally {
         isLoading.value = false;
      }
   };

   return {
      responseData,
      isLoading,
      fetchError,
      executeFetch,
   };
}
