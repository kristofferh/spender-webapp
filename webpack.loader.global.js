// Include global variables and mixins in all SASS files.
// Uses ES2015 template syntax so requires Node 5+.
module.exports = function(source) {
  this.cacheable(); // Flag this loader as cacheable.
  return `@import './src/client/styles/variables/index';
    ${source}`;
};
