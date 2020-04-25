export const kebabToCamel = string =>
  string
    .trim()
    .toLowerCase()
    .replace(/(-|_|\s)+/g, "-")
    .replace(/-$/, "")
    .replace(/-([a-z])/g, (_, $1, pos) => {
      if (pos === 0) {
        return $1;
      }
      return $1.toUpperCase();
    });

export const cssToJs = css =>
  css
    .trim()
    .replace(/;$/, "")
    .split(";")
    .reduce((ruleMap, ruleString) => {
      const [key, value] = ruleString.split(":");
      if (key && value) {
        ruleMap[kebabToCamel(key.trim())] = value.trim();
      }
      return ruleMap;
    }, {});
