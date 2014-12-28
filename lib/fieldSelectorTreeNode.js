/* =========================================================================
 * Dependencies
 * ========================================================================= */
var _ = require('underscore');

/* =========================================================================
 * Constants
 * ========================================================================= */
var EXCLUDE_EXPRESSION = '-';

/* =========================================================================
 * Constructor
 * ========================================================================= */
function FieldSelectorTreeNode(memberName) {
  var _this = this;

  _this.memberName = memberName;
  _this.children = [];

  if (_this.memberName.substring(0, 1) === EXCLUDE_EXPRESSION) {
    _this.exclude = true;
  }
}

FieldSelectorTreeNode.prototype.getOrAddChildNode = function(memberName) {
  var _this = this;

  var childNode = _.find(_this.children, function(child) {
    return child.memberName === memberName;
  });

  if (!childNode) {
    childNode = new FieldSelectorTreeNode(memberName);
    _this.children.push(childNode);
  }

  return childNode;
};

/* =========================================================================
 * Exports
 * ========================================================================= */
module.exports = FieldSelectorTreeNode;
