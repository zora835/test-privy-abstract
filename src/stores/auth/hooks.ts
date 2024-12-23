import useAuthStore from "@/stores/auth"

export function useHasSignedIn() {
    /**
     * @todo check if updatedAt to now is less than 5 minutes
     */
    return useAuthStore((state) => !!state.jwt)
}
