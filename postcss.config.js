module.exports = ({ env }) => ({
  plugins: {
    autoprefixer: {
      remove: false
    },
    // prettier-ignore
    cssnano:
      env === "production"
        ? {
          autoprefixer: false, // CSSNano's autoprefixer just removes prefixes.
          reduceIdents: false, // Don't rename/shorten animation names.
          mergeRules: false,
          discardUnused: false, // Don't remove "unused" at-rules
          discardComments: {
            removeAll: true
          },
          zindex: false // Don't rebase z-index values.
        }
        : false
  }
});
