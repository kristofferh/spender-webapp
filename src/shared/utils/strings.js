export const kebabToCamel = string =>
  string.toLowerCase().replace(/-([a-z])/g, g => g[1].toUpperCase());

export const cssToJs = css =>
  css.split(";").reduce(function(ruleMap, ruleString) {
    var rulePair = ruleString.split(":");
    ruleMap[kebabToCamel(rulePair[0].trim())] = rulePair[1].trim();

    return ruleMap;
  }, {});
