export const clearLocalStorage = () => localStorage.clear();
export const setToken = (token: string) => localStorage.setItem("token", token);