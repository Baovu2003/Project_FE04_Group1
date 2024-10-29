export const userActions = (payload) => {
    console.log(payload)
    return {
        type: "NEW_USER",
        payload: payload,
    }
}