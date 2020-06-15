export const get = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };

export const set = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  };

export const remove = (key) => {
    localStorage.removeItem(key);
    return true;
  };