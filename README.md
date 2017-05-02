# redux-model-tools

Helpers for Redux to reduce its boilerplate.

<a href="https://evilmartians.com/?utm_source=postcss-modules">
<img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg" alt="Sponsored by Evil Martians" width="236" height="54">
</a>


## Using

Create namespaced constants:

```js
// model.js
import { createConstants } from 'redux-model-tools';


const constants = createConstants('POST', [
  'EDIT',
  'REMOVE',
  'PUBLISH',
]);

console.log(constants.EDIT); // 'POST/EDIT'
```


And use them to create the corresponding actions. An action creator will be
created for each constant automatically:

```js
// actions.js
import { createActions } from 'redux-model-tools';
import { constants }     from './model';
import store             from './store';


const actions = createActions(constants, {
  asyncPublish() {
    return (dispatch) => { // using redux-thunk
      // every action created from a constant is assigned to `this`
      dispatch(this.publish()); 
    };
  }
})


// actions.edit(42)     -> { type: 'POST/EDIT', payload: 42 }
// actions.remove(42)   -> { type: 'POST/REMOVE', payload: 42 }
// actions.asyncPublish -> dispatch => {}
```
