export const accountActions = (payload) => {
    console.log(payload)
    return {
        type: "NEW_ACCOUNT",
        payload: payload,
    }
}