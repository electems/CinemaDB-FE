import { AuthUser } from '@/features/auth';

const storagePrefix = 'cinamedbs_react_';

const storage = {
  getToken: () => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}token`) as string);
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  setUser: (user: AuthUser) => {
    window.localStorage.setItem(`${storagePrefix}authuser`, JSON.stringify(user));
  },
  getUser: () => {
    const userRaw = window.localStorage.getItem(`${storagePrefix}authuser`);
    if (userRaw) {
      return JSON.parse(userRaw);
    }
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
};

export default storage;
