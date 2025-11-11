// Simple ignore loader that returns empty module
module.exports = function() {
  this.cacheable && this.cacheable();
  return '';
};