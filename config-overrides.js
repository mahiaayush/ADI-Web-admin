const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = (config) => {
  const updatedConfig = { ...config };
  updatedConfig.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));

  return updatedConfig;
};
