/* =========================================================================
 * Dependencies
 * ========================================================================= */
var _ = require('underscore');

var FieldSelectorTreeNode = require('./fieldSelectorTreeNode');

/* =========================================================================
 * Constants
 * ========================================================================= */
var MULTIPLE_FIELD_SELECTOR = ',';
var NESTED_FIELD_SELECTOR = '/';
var BEGIN_SUB_SELECT_EXPRESSION = '(';
var END_SUB_SELECT_EXPRESSION = ')';

/* =========================================================================
 * Constructor
 * ========================================================================= */
function PartialResponseParser() {}

PartialResponseParser.prototype.expand = function(fields, next) {
  if (!fields) return next(new Error('fields is required'));
  if (typeof(fields) !== 'string') return next(new Error('fields must be a string'));
  fields = fields.trim();

  var subSelectStack = [];
  var nestedStack = [];
  var currentMemberName = '';
  var parent = new FieldSelectorTreeNode('');

  for (var i = 0; i < fields.length; i++) {
    var currentChar = fields[i];

    var childNode = null;

    switch (currentChar) {
      case NESTED_FIELD_SELECTOR:
        if (currentMemberName.length === 0) {
          return next(new Error('Nested Field token ' + NESTED_FIELD_SELECTOR + ' can not be preceeded by another reserved token.'));
        }
        childNode = parent.getOrAddChildNode(currentMemberName);
        currentMemberName = '';

        nestedStack.push(parent);
        parent = childNode;

        break;
      case MULTIPLE_FIELD_SELECTOR:
        if (currentMemberName.length !== 0) {
          parent.getOrAddChildNode(currentMemberName);
          currentMemberName = '';
        }
        while (nestedStack.length > 0) {
          parent = nestedStack.pop();
        }

        break;
      case BEGIN_SUB_SELECT_EXPRESSION:
        if (currentMemberName.length === 0) {
          return next(new Error('Begin Subselection token ' + BEGIN_SUB_SELECT_EXPRESSION + ' can not be preceeded by another reserved token.'));
        }

        childNode = parent.getOrAddChildNode(currentMemberName);
        currentMemberName = '';

        subSelectStack.push(parent);
        parent = childNode;

        nestedStack = [];

        break;
      case END_SUB_SELECT_EXPRESSION:
        if (currentMemberName.length !== 0) {
          parent.getOrAddChildNode(currentMemberName);
          currentMemberName = '';
        }
        parent = subSelectStack.pop();
        nestedStack = [];

        break;
      default:
        currentMemberName += currentChar;
    }
  }

  if (currentMemberName.length > 0) {
    parent.getOrAddChildNode(currentMemberName);

    while (nestedStack.length > 0) {
      parent = nestedStack.pop();
    }
  }

  next(null, parent.children);
};

/* =========================================================================
 * Exports
 * ========================================================================= */
module.exports = new PartialResponseParser();
