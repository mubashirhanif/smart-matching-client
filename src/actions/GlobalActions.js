export const setApiUrl = (url) => {
    return {
      type: 'setApiUrl',
      url
    }
};

export const setGlobalCounter = (count) => {
    return {
      type: 'setGlobalCounter',
      count
    }
};
