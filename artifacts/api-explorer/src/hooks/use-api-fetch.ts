import { useMutation } from "@tanstack/react-query";

export function useApiFetch() {
  return useMutation({
    mutationFn: async (url: string) => {
      const res = await fetch(url);
      
      // If the response is not OK, we still want to try to parse 
      // the error body to show useful information if the API provides it.
      if (!res.ok) {
        let errorMessage = `HTTP Error ${res.status} ${res.statusText}`;
        try {
          const errData = await res.json();
          // Often APIs return { error: "message" } or { message: "error" }
          if (errData.error) errorMessage = typeof errData.error === 'string' ? errData.error : JSON.stringify(errData.error);
          else if (errData.message) errorMessage = errData.message;
        } catch (e) {
          // Ignore JSON parse errors for non-JSON error responses
        }
        throw new Error(errorMessage);
      }
      
      // Some endpoints might return non-JSON, but in our curated list, they all return JSON.
      return res.json();
    },
  });
}
