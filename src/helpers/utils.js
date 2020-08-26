export const throttle = (func, threshold, scope) => {
  threshold || (threshold = 250);
  let last, deferTimer;
  return function () {
    let context = scope || this;

    let now = +new Date(),
      args = arguments;
    if (last && now < last + threshold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        func.apply(context, args);
      }, threshold);
    } else {
      last = now;
      func.apply(context, args);
    }
  };
};

export function isMobile() {
  let userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (
    /windows phone/i.test(userAgent) ||
    /android/i.test(userAgent) ||
    (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
  ) {
    return true;
  }

  return false;
}
