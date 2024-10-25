// PATCH sẽ gọi những hàm action này để gửi đi cho 
// những REDUCER nhận và trả vào store 1 kết quả mới
export const loginActions = (payload) => {
    console.log("payload in login actions: ",payload)
    return {
        type: "LOGIN",
        payload: payload,
    }
}

export const logoutActions = (payload) => {
    return {
        type: "LOGOUT",
        payload: payload,
    }
}