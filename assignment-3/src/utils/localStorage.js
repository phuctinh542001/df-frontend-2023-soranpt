export const getFromLocalStorage = (key) => {
  try {
    const value = window.localStorage.getItem(key);

    if (value) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.error(error);
  }
};

export const setToLocalStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};
