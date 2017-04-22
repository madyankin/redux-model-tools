import * as reduxActions from 'redux-actions';


export function createConstants(namespace, constants) {
  return constants.reduce((acc, constant) => {
    acc[constant.toUpperCase()] = `${ namespace }/${ constant }`.toUpperCase();
    return acc;
  }, {});
}


export function createActions(constants, actions) {
  const namespacedIdentityActions = reduxActions.createActions(
    {},
    ...Object.values(constants),
  );

  const identityActions = Object
    .keys(namespacedIdentityActions)
    .reduce((acc, namespacedActionName) => {
      const actionName = namespacedActionName.split('/')[1];
      acc[actionName]  = namespacedIdentityActions[namespacedActionName];

      return acc;
    }, {});

  const allActions = {
    ...identityActions,
    ...actions,
  };

  Object.keys(allActions).forEach((action) => {
    allActions[action] = allActions[action].bind(allActions);
  });

  return allActions;
}

