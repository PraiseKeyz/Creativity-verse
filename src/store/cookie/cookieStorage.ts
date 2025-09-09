import Cookies from "js-cookie";

export const CookieStorage = {
  getItem: (key: string) => {
    const value = Cookies.get(key);
    return value ? JSON.parse(value) : null;
  },

  setItem: (key: string, value: any) => {
    Cookies.set(key, JSON.stringify(value), { expires: 7, secure: true });
  },
  removeItem: (key: string) => {
    Cookies.remove(key);
  },
};
