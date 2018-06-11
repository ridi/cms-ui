const path = require('path');
const { cloneDeep } = require('lodash');

const ruleChildren = (loader) => loader.use || loader.oneOf || Array.isArray(loader.loader) && loader.loader || [];

const findIndexAndRules = (rulesSource, ruleMatcher) => {
  let result = undefined;
  const rules = Array.isArray(rulesSource) ? rulesSource : ruleChildren(rulesSource);
  rules.some((rule, index) => result = ruleMatcher(rule) ? {
    index,
    rules,
  } : findIndexAndRules(ruleChildren(rule), ruleMatcher));
  return result;
};

const findRule = (rulesSource, ruleMatcher) => {
  const { index, rules } = findIndexAndRules(rulesSource, ruleMatcher);
  return rules[index];
};

const cssRuleMatcher = (rule) => rule.test && String(rule.test) === String(/\.css$/);

const createLoaderMatcher = (loader) => (rule) => rule.loader && rule.loader.indexOf(`${path.sep}${loader}${path.sep}`) !== -1;
const cssLoaderMatcher = createLoaderMatcher('css-loader');
const postcssLoaderMatcher = createLoaderMatcher('postcss-loader');
const fileLoaderMatcher = createLoaderMatcher('file-loader');

const addBeforeRule = (rulesSource, ruleMatcher, value) => {
  const { index, rules } = findIndexAndRules(rulesSource, ruleMatcher);
  rules.splice(index, 0, value);
};

module.exports = function (
  config,
  env,
  overrideCssLoaderOptions = options => options,
  overridePostcssLoaderOptions = options => options,
) {
  const cssRule = findRule(config.module.rules, cssRuleMatcher);
  const cssModulesRule = cloneDeep(cssRule);

  cssRule.exclude = /\.module\.css$/;

  const cssModulesRuleCssLoader = findRule(cssModulesRule, cssLoaderMatcher);
  cssModulesRuleCssLoader.options = overrideCssLoaderOptions({
    ...cssModulesRuleCssLoader.options,
    modules: true,
    localIdentName: '[local]___[hash:base64:5]',
  });

  const postcssLoader = findRule(cssModulesRule, postcssLoaderMatcher);
  postcssLoader.options = overridePostcssLoaderOptions({
    ...postcssLoader.options,
    ident: 'postcss',
    plugins: () => [
      require('postcss-import')(),
      require('postcss-cssnext')(),
    ],
  });

  addBeforeRule(config.module.rules, fileLoaderMatcher, cssModulesRule);

  return config;
};
