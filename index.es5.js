'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.createConstants = createConstants;
exports.createActions = createActions;

var _reduxActions = require('redux-actions');

var reduxActions = _interopRequireWildcard(_reduxActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function createConstants(namespace, constants) {
  return constants.reduce(function (acc, constant) {
    acc[constant.toUpperCase()] = (namespace + '/' + constant).toUpperCase();
    return acc;
  }, {});
}

function createActions(constants, actions) {
  var namespacedIdentityActions = reduxActions.createActions.apply(reduxActions, [{}].concat(_toConsumableArray(Object.values(constants))));

  var identityActions = Object.keys(namespacedIdentityActions).reduce(function (acc, namespacedActionName) {
    var actionName = namespacedActionName.split('/')[1];
    acc[actionName] = namespacedIdentityActions[namespacedActionName];

    return acc;
  }, {});

  var allActions = _extends({}, identityActions, actions);

  Object.keys(allActions).forEach(function (action) {
    allActions[action] = allActions[action].bind(allActions);
  });

  return allActions;
}

