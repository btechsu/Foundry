import config from './config';
import { linkResolver } from './linkResolver';
import * as ROUTES from './routes';

export const throttle = (func, wait = 100) => {
  let timer = null;
  return function (...args) {
    if (timer === null) {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, wait);
    }
  };
};

export const hex2rgba = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

export const isloggedin = () => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('authUser')) {
      return true;
    } else {
      return false;
    }
  }
};

export const getuser = () => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('authUser')) {
      let authUser = JSON.parse(localStorage.getItem('authUser'));
      return authUser;
    }
  }

  return null;
};

export { config, ROUTES, linkResolver };
