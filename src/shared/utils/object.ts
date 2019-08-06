export function omit(obj: any, ...keysToOmit: any) {
  return Object.keys(obj).reduce(
    (acc, key) => {
      if (keysToOmit.indexOf(key) === -1) {
        acc[key] = obj[key];
      }
      return acc;
    },
    {} as { [key: string]: any }
  );
}
