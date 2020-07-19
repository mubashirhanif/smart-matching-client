export const setApiUrl = (url) => {
  return {
    type: "setApiUrl",
    url,
  };
};

export const setUser = (user) => {
  return {
    type: "setUser",
    user,
  };
};

export const setTheme = (theme) => {
  return {
    type: "setTheme",
    theme,
  };
};

export const setIsLoggedIn = (isLoggedIn) => {
  return {
    type: "setIsLoggedIn",
    isLoggedIn,
  };
};
export const setNotificationHandler = (notificationHandler) => {
  return {
    type: "setNotificationHandler",
    notificationHandler,
  };
};
