import authStore from "."

export const getAccessToken = () => {
    return authStore.getState().jwt
}
