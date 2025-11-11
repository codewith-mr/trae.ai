const path = require('path');

class ExcludeRoutesPlugin {
  constructor(options = {}) {
    this.excludePatterns = options.excludePatterns || [];
  }

  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap('ExcludeRoutesPlugin', (nmf) => {
      nmf.hooks.beforeResolve.tap('ExcludeRoutesPlugin', (resolveData) => {
        if (resolveData.request) {
          const request = resolveData.request;
          
          // Check if the request matches any of our exclude patterns
          for (const pattern of this.excludePatterns) {
            if (request.includes(pattern)) {
              return false; // Prevent resolution
            }
          }
        }
      });
    });
  }
}

module.exports = ExcludeRoutesPlugin;