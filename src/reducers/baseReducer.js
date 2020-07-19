const initState = {
  user: null,
  theme: "light",
  isLoggedIn: false,
};

const baseReducer = (state = initState, action) => {
  switch (action.type) {
    case "setApiUrl":
      return {
        ...state,
        url: action.url,
      };
    case "setTheme":
      return {
        ...state,
        theme: action.theme,
      };
    case "setUser":
      return {
        ...state,
        user: action.user,
      };
    case "setIsLoggedIn":
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
    default:
      return state;
  }
};

export default baseReducer;
