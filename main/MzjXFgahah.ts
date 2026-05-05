function debounce(fn: Function, delay: number) {
  let timeoutId: number | null = null;
  return function(...args: any[]) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = window.setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
function throttle(fn: Function, limit: number) {
  let lastFn: ReturnType<typeof setTimeout>;
  let lastRan: number;
  return function(...args: any[]) {
    const context = this;
    if (!lastRan) {
      fn.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          fn.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}
function memoize(fn: Function) {
  const cache: {[key: string]: any} = {};
  return function(...args: any[]) {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}
function flattenArray(arr: any[]) {
  return arr.reduce((flat: any[], toFlatten: any) => {
    return flat.concat(Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten);
  }, []);
}
function uniqueArray(arr: any[]) {
  return Array.from(new Set(arr));
}
