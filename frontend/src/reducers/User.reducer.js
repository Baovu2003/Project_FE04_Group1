const initialState = {};

const UserReducer = (state = initialState, { type, payload }) => {
  console.log({ payload, type });
  console.log("UserReducer", state, payload);
  switch (type) {
    case "NEW_USER":
      return { ...payload };
    default:
      return state;
  }
};

export default UserReducer;
