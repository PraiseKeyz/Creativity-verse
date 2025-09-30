import Cookies from "js-cookie";

export const CookieStorage = {
  getItem: (key: string) => {
    const value = Cookies.get(key);
    return value ? JSON.parse(value) : null;
  },

  setItem: (key: string, value: any) => {
    // Only mark cookie as secure in production so it works on localhost (http)
    const opts: Cookies.CookieAttributes = {
      expires: 7,
      secure: !!import.meta.env.PROD,
      sameSite: "lax",
      path: "/",
    };
    Cookies.set(key, JSON.stringify(value), opts);
  },
  removeItem: (key: string) => {
    Cookies.remove(key, { path: "/" });
  },
};
